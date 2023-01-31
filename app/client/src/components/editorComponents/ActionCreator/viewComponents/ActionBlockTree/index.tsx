/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useCallback, useState } from "react";
import clsx from "clsx";
import { ActionTree, SelectedActionBlock } from "../../types";
import { getActionInfo } from "./utils";
import { ActionBlock } from "../ActionBlock";
import { Icon } from "design-system-old";
import TreeStructure from "components/utils/TreeStructure";
import { AppsmithFunction } from "../../constants";

type Props = {
  actionTree: ActionTree;
  selected?: boolean;
  selectedCallbackBlock?: SelectedActionBlock | null;
  onClick: () => void;
  handleAddSuccessBlock?: () => void;
  handleAddFailureBlock?: () => void;
  handleBlockSelection?: (selectedBlock: SelectedActionBlock) => void;
};

type CallbackBlock = {
  label: "On success" | "On failure";
  handleAddBlock: () => void;
  callbacks: ActionTree[];
  blockType: SelectedActionBlock["type"];
  handleSelection: (block: SelectedActionBlock) => void;
};

export const ActionBlockTree: React.FC<Props> = ({
  actionTree,
  onClick,
  selected = false,
  handleAddSuccessBlock = () => {},
  handleAddFailureBlock = () => {},
  handleBlockSelection = () => {},
  selectedCallbackBlock,
}) => {
  const [showCallbacks, setShowCallbacks] = useState(true);
  const { actionType, code, errorCallbacks, successCallbacks } = actionTree;
  const { action, actionTypeLabel, Icon: MainActionIcon } = getActionInfo(
    code,
    actionType,
  );

  const callBacksLength =
    successCallbacks.filter(
      ({ actionType }) => actionType !== AppsmithFunction.none,
    ).length +
    errorCallbacks.filter(
      ({ actionType }) => actionType !== AppsmithFunction.none,
    ).length;

  const areCallbacksApplicable = [
    AppsmithFunction.runAPI,
    AppsmithFunction.integration,
  ].includes(actionType as any);

  const callbackBlocks: CallbackBlock[] = [
    {
      label: "On success",
      handleAddBlock: handleAddSuccessBlock,
      callbacks: successCallbacks,
      blockType: "success",
      handleSelection: handleBlockSelection,
    },
    {
      label: "On failure",
      handleAddBlock: handleAddFailureBlock,
      callbacks: errorCallbacks,
      blockType: "failure",
      handleSelection: handleBlockSelection,
    },
  ];

  const isNewActionSelected = useCallback(
    (type: CallbackBlock["blockType"]) => {
      if (selectedCallbackBlock) {
        const { index } = selectedCallbackBlock;
        const callbacks =
          type === "success"
            ? actionTree.successCallbacks
            : actionTree.errorCallbacks;
        return (
          selectedCallbackBlock.type === type &&
          callbacks[index]?.actionType === AppsmithFunction.none
        );
      }

      return false;
    },
    [selectedCallbackBlock, actionTree],
  );

  return (
    <div className="flex flex-col">
      <div
        className={clsx(
          "flex flex-col",
          selected && "border-[1px] border-gray-200",
        )}
      >
        {
          <ActionBlock
            action={action}
            actionTypeLabel={actionTypeLabel}
            // We don't have to show the action count if the action is selected
            actionsCount={selected ? 0 : callBacksLength}
            icon={MainActionIcon}
            onClick={onClick}
            selected={selected && !selectedCallbackBlock}
            variant={selected ? "borderLess" : "hoverBorder"}
          />
        }
        {areCallbacksApplicable && selected ? (
          <button
            className="flex justify-between bg-gray-50 px-2 py-1"
            onClick={() => setShowCallbacks((prev) => !prev)}
          >
            <span className="text-gray-800 underline underline-offset-2 decoration-dashed decoration-gray-300">
              Callbacks
            </span>
            <div className="flex gap-1">
              <span className="text-gray-800">
                {callBacksLength > 0 ? callBacksLength : "No"} actions
              </span>
              <Icon
                fillColor="var(--ads-color-gray-700)"
                name={showCallbacks ? "expand-less" : "expand-more"}
                size="extraLarge"
              />
            </div>
          </button>
        ) : null}
      </div>
      {showCallbacks && selected && areCallbacksApplicable ? (
        <TreeStructure>
          <ul className="tree flex flex-col gap-0">
            {callbackBlocks.map(
              ({
                blockType,
                callbacks,
                handleAddBlock,
                handleSelection,
                label,
              }) => (
                <li key={label}>
                  <div className="flex flex-col">
                    <button
                      className={clsx(
                        "action-callback-add",
                        "flex justify-between bg-gray-50 border-[1px] border-b-transparent border-gray-200 box-border",
                        callbacks.length === 0 &&
                          "border-b-[1px] border-b-gray-200",
                        isNewActionSelected(blockType) && "selected",
                      )}
                      onClick={handleAddBlock}
                    >
                      <span className="text-gray-800 underline underline-offset-2 decoration-dashed decoration-gray-300 px-2 py-1">
                        {label}
                      </span>
                      <span className="icon w-7 h-7 flex items-center justify-center">
                        <Icon
                          fillColor="var(--ads-color-black-700)"
                          name="plus"
                          size="extraLarge"
                        />
                      </span>
                    </button>
                    {callbacks
                      .filter(
                        ({ actionType }) =>
                          actionType !== AppsmithFunction.none,
                      )
                      .map((actionTree, index) => (
                        <CallbackActionBlock
                          actionTree={actionTree}
                          blockType={blockType}
                          handleSelection={handleSelection}
                          index={index}
                          key={actionTree.code + index}
                          selectedCallbackBlock={selectedCallbackBlock}
                        />
                      ))}
                  </div>
                </li>
              ),
            )}
          </ul>
        </TreeStructure>
      ) : null}
    </div>
  );
};

type CallbackActionBlockProps = {
  actionTree: ActionTree;
  index: number;
  blockType: SelectedActionBlock["type"];
  selectedCallbackBlock?: SelectedActionBlock | null;
  handleSelection: (block: SelectedActionBlock) => void;
};

const CallbackActionBlock: React.FC<CallbackActionBlockProps> = ({
  actionTree,
  blockType,
  handleSelection,
  index,
  selectedCallbackBlock,
}) => {
  const { actionType, code } = actionTree;
  const { action, actionTypeLabel, Icon } = getActionInfo(code, actionType);
  return (
    <ActionBlock
      action={action}
      actionTypeLabel={actionTypeLabel}
      icon={Icon}
      key={code + index}
      onClick={() => handleSelection({ type: blockType, index })}
      selected={
        selectedCallbackBlock?.type === blockType &&
        selectedCallbackBlock?.index === index
      }
      variant="callbackBlock"
    />
  );
};