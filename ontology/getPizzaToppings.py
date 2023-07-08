import os
import sys
from rdflib import Graph
import json

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

    
    SELECT ?pizzaName ?pizzaTopping ?pizzaSpice
                  WHERE { 
                            	?pizzaName  rdfs:subClassOf pizza:NamedPizza  ;
                		                rdfs:subClassOf ?pizzaDetails . 
               	 	            ?pizzaDetails owl:someValuesFrom ?pizzaTopping .
                                ?pizzaTopping rdfs:subClassOf ?pizzaToppingProp . 
                                ?pizzaToppingProp owl:someValuesFrom ?pizzaSpice
            	}
"""

results = g.query(query) 

l = []
for row in results:
    pizzaName=row["pizzaName"]
    pizzaName=pizzaName.split("#")
    pizzaName=pizzaName[1]
    pizzaTopping=row["pizzaTopping"]
    pizzaTopping=pizzaTopping.split("#")
    pizzaTopping=pizzaTopping[1]
    pizzaSpice=row["pizzaSpice"]
    pizzaSpice=pizzaSpice.split("#")
    pizzaSpice=pizzaSpice[1]

    if sys.argv[1] == pizzaName:
        d = {"name": pizzaName, "topping": pizzaTopping, "spice": pizzaSpice }
        l.append(d)

print(json.dumps(l))