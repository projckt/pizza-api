import os
import sys
from rdflib import Graph

dirname = os.path.dirname(__file__)
owlFilePath = os.path.join(dirname, 'pizza.owl')

g = Graph()
g.parse(owlFilePath)

query = """
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX pizza: <http://www.co-ode.org/ontologies/pizza/pizza.owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    
    SELECT DISTINCT ?s WHERE {
        ?s rdfs:subClassOf ?restriction .
        ?restriction owl:hasValue pizza:""" + sys.argv[1] + """ .
    }
"""

results = g.query(query) 

for row in results:
    uri=row["s"]
    uri=uri.split("#")
    print(uri[1])