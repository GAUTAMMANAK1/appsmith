import type { DataTreeEntity } from "entities/DataTree/dataTreeFactory";
import { isDataTreeEntity } from "@appsmith/workers/Evaluation/evaluationUtils";
import { entityFns } from "@appsmith/workers/Evaluation/fns";
import setters from "workers/Evaluation/setters";

export default function isEntityFunction(
  entity: unknown,
  propertyName: string,
  entityName: string,
) {
  if (!isDataTreeEntity(entity)) return false;

  if (setters.has(entityName, propertyName)) return true;

  return entityFns.find(
    (entityFn) =>
      entityFn.name === propertyName &&
      entityFn.qualifier(entity as DataTreeEntity),
  );
}
