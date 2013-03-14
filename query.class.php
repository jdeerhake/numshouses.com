<?php
class Query {
  public static $cache = array();
	function __construct($type = 'SELECT', $table) {
		$this->type = strtoupper($type);
		$this->table = $table;
		$this->cols = "";
		$this->where = "";
	}

	function addSelector($name, $alias) {
		if(is_array($name)) {
			foreach($name as $cur) {
				$this->cols[] = "$cur";
			}
		} else {
			if($name == "*")
				$this->cols[] = "*";
			elseif($alias)
				$this->cols[] = "$name as $alias";
			else
				$this->cols[] = "$name";
		}
		return $this;
	}

	function addClause($col, $value, $type = "=", $quote = true) {
		$splitVal = explode('/', $value);
		if(count($splitVal) == 1) {
			if(!$quote) $this->where[] = "$col $type $value";
			else $this->where[] = "$col $type '$value'";
		} else {
			$cur;
			foreach($splitVal as $index => $value)
				$cur[] = "$col = '$value'";
			$this->where[] = implode(' OR ', $cur);
		}
		return $this;
	}

	function join($table, $condition) {
	  $this->join[] = "JOIN $table ON $condition";
	  return $this;
	}

	function addNewValue($col, $value) {
		$this->update[] = "$col = '$value'";
		$this->fields[] = $col;
		$this->values[] = "'$value'";
		return $this;
	}

	function searchTerms($cols, $value) {
		$this->searchCols = implode("," , $cols);
		$this->searchValue = $value;
		return $this;
	}

  function groupBy($col) {
    $this->groupCols[] = $col;
		return $this;
  }

	function orderBy($coldir) {
		$this->orderBys[] = $coldir;
		return $this;
	}

	function buildQuery($execute = TRUE) {
		switch($this->type) {
			case "SELECT":
				if($this->cols) {
					$cols = implode(',', $this->cols);
					$this->sql = "SELECT $cols FROM `{$this->table}`";
				} else
					$this->sql = "SELECT * FROM `{$this->table}`";
			break;
			case "UPDATE":
				$update = implode(',', $this->update);
				$this->sql = "UPDATE `{$this->table}` SET $update";
			break;
			case "INSERT":
				$fields = implode(',', $this->fields);
				$values = implode(',', $this->values);
				$this->sql = "INSERT INTO {$this->table}($fields) values($values)";
			break;
			case "DELETE":
				$this->sql = "DELETE FROM {$this->table}";
			break;
		}

		if(isset($this->join) && is_array($this->join)) {
		  $joins = implode(' ', $this->join);
		  $this->sql .= " $joins";
		}

		if(is_array($this->where)) {
			$where = implode(' AND ', $this->where);
			if($this->type == "SEARCH")
				$this->sql .= " AND $where";
			else
				$this->sql .= " WHERE $where";
		}

		if(isset($this->groupCols) && is_array($this->groupCols)) {
		  $args = implode(", ", $this->groupCols);
			$this->sql .= " GROUP BY $args";
		}


		if(isset($this->orderBys) && is_array($this->orderBys)) {
		  $args = implode(", ", $this->orderBys);
			$this->sql .= " ORDER BY $args";
		}

		if($execute)
			return $this->makeQuery();
		else
			return $this->sql;
	}

	function makeQuery() {
	  if(isset(self::$cache[$this->sql])) {
	    $this->result = self::$cache[$this->sql];
	    return $this->result;
	  } else {
		  $result = mysql_query($this->sql) or die("<b>Error</b>: " . mysql_error() . "\n<br /><b>Statement</b>: {$this->sql}");
		  if($result) {
			  switch($this->type) {
				  case "UPDATE":
				  case "DELETE":
					  return true;
				  break;
				  case "INSERT":
					  return mysql_insert_id();
				  break;
				  default:
				    $this->result = array();
					  while($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
						  array_push($this->result, $row);
					  }
					  if(isset($this->result)) {
					    self::$cache[$this->sql] = $this->result;
						  $this->rowCount = count($this->result);
						  return $this->result;
					  } else {
						  $this->rowCount = 0;
						  return false;
					  }
				  break;
			  }
		  } else return false;
	  }
	}
}

