import os
from rdflib import Graph

dirname = os.path.dirname(__file__)
owlFilePath = os.path.join(dirname, 'pizza.owl')

g = Graph()
g.parse(owlFilePath)

query = """
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX pizza: <http://www.co-ode.org/ontologies/pizza/pizza.owl#>

    SELECT ?toppings WHERE { ?toppings rdfs:subClassOf+ pizza:PizzaTopping }
"""

results = g.query(query) 

for row in results:
    uri=row["toppings"]
    uri=uri.split("#")
    print(uri[1])