import json
import re

def kql_to_es_query(kql):
    # Remove surrounding spaces and split into terms
    kql = kql.strip()

    # Initialize the query
    es_query = {
        "bool": {
            "must": [],
            "filter": [],
            "should": [],
            "must_not": []
        }
    }

    # Mapping logical operators
    operators = {
        "AND": "must",
        "OR": "should",
        "NOT": "must_not"
    }

    # Regex for different types of queries
    term_regex = re.compile(r'([^\s]+)(:|!|>|>=|<|<=)([^\s]+)')
    current_operator = "must"

    # Tokenize the KQL string while respecting the operators
    tokens = re.findall(r'(\S+|\s+)', kql)

    for token in tokens:
        token = token.strip()
        if not token:
            continue

        if token in operators:
            current_operator = operators[token]
        else:
            match = term_regex.match(token)
            if match:
                field, op, value = match.groups()
                query_part = {}

                if op == ':':
                    query_part = {"match": {field: value.strip('"')}}
                elif op == '!':
                    query_part = {"match": {field: value.strip('"')}}
                    current_operator = "must_not"
                elif op in ('>', '>=', '<', '<='):
                    query_part = {
                        "range": {
                            field: {
                                op: value
                            }
                        }
                    }

                es_query["bool"][current_operator].append(query_part)
                current_operator = "must"  # Reset after using must_not

    # Remove empty parts of the query
    es_query["bool"] = {k: v for k, v in es_query["bool"].items() if v}

    return json.dumps(es_query, indent=2)

# Example usage
kql_query = 'status:"200" AND extension:"jpg" OR size>100 AND !type:"png"'
es_query = kql_to_es_query(kql_query)
print(es_query)
