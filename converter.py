def kql_to_es_query(kql):
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

    # Mapping comparison operators
    comparison_operators = {
        '>': 'gt',
        '>=': 'gte',
        '<': 'lt',
        '<=': 'lte'
    }

    current_operator = "must"

    # Tokenize the KQL string respecting quotes and operators
    tokens = re.findall(r'("[^"]+"|\S+)', kql)

    # Regex for matching field operator value
    term_regex = re.compile(r'([^:!><=]+)\s*(>=|>|<=|<|:|!)\s*"?(.*?)"?$')

    i = 0
    while i < len(tokens):
        token = tokens[i].strip()
        if token in operators:
            current_operator = operators[token]
        else:
            # Check if the current token is a logical operator
            if i+1 < len(tokens) and tokens[i+1] in comparison_operators:
                field = tokens[i]
                op = tokens[i+1]
                value = tokens[i+2].strip('"')
                query_part = {
                    "range": {
                        field: {
                            comparison_operators[op]: value
                        }
                    }
                }
                es_query["bool"][current_operator].append(query_part)
                i += 2  # Skip the next two tokens as they are part of the current term
            else:
                match = term_regex.match(' '.join(tokens[i:i+3]))
                if match:
                    field, op, value = match.groups()
                    query_part = {}

                    if op == ':':
                        query_part = {"match": {field: value.strip('"')}}
                    elif op == '!':
                        query_part = {"match": {field: value.strip('"')}}
                        current_operator = "must_not"
                    elif op in comparison_operators:
                        query_part = {
                            "range": {
                                field: {
                                    comparison_operators[op]: value.strip('"')
                                }
                            }
                        }

                    es_query["bool"][current_operator].append(query_part)
                    current_operator = "must"  # Reset after using must_not
                    i += 2  # Skip the next two tokens as they are part of the current term
        i += 1

    # Remove empty parts of the query
    es_query["bool"] = {k: v for k, v in es_query["bool"].items() if v}

    return json.dumps(es_query, indent=2)
