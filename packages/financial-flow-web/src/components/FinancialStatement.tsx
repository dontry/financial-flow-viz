import React from "react";
import { Icon } from "@iconify/react";
import { FINANCIAL_CONTEXT_DICT } from "@financial-flow-viz/core";

interface StatementSection {
  id: string;
  label: string;
  children: StatementRow[];
}

interface StatementRow {
  id: string;
  label: string;
  value: number;
  children?: StatementRow[];
}

interface Props {
  title: string;
  sections: StatementSection[];
}

export const FinancialStatement: React.FC<Props> = ({ title, sections }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      {sections.map((section) => (
        <div key={section.label}>
          <h4 className="text-gray-600 font-semibold mb-2">{section.label}</h4>
          {section.children.map((child) => {
            const desc =
              FINANCIAL_CONTEXT_DICT[
                child.id as keyof typeof FINANCIAL_CONTEXT_DICT
              ];
            return (
              <div key={child.label} className="mb-4">
                <div className="w-full flex flex-row justify-between items-center">
                  <span className="text-gray-600 inline items-center gap-1 font-semibold">
                    {child.label}
                    {desc && (
                      <span className="group relative">
                        <Icon
                          icon="material-symbols:info"
                          className="inline-block h-4 w-4 text-gray-400 hover:text-gray-600 cursor-help"
                        />
                        <span className="pointer-events-none max-w-[200px] absolute -top-7 left-0 w-max opacity-0 transition-opacity group-hover:opacity-100 bg-gray-900 text-white text-sm rounded-lg p-2">
                          {desc}
                        </span>
                      </span>
                    )}
                  </span>

                  <span className="text-gray-600">
                    ${child.value.toFixed(2)}
                  </span>
                </div>
                <hr />

                {"children" in child &&
                  child.children &&
                  child.children.map((subChild) => {
                    const desc =
                      FINANCIAL_CONTEXT_DICT[
                        subChild.id as keyof typeof FINANCIAL_CONTEXT_DICT
                      ];
                    return (
                      <div
                        className="flex flex-row justify-between"
                        key={subChild.label}
                      >
                        <span className="text-gray-600 inline items-center gap-1 font-medium">
                          {subChild.label}
                          {desc && (
                            <span className="group relative">
                              <Icon
                                icon="material-symbols:info"
                                className="inline-block h-4 w-4 text-gray-400 hover:text-gray-600 cursor-help"
                              />
                              <span className="pointer-events-none max-w-[200px] absolute -top-7 left-0 w-max opacity-0 transition-opacity group-hover:opacity-100 bg-gray-900 text-white text-sm rounded-lg p-2">
                                {desc}
                              </span>
                            </span>
                          )}
                        </span>
                        <span className="text-gray-600">
                          ${subChild.value.toFixed(2)}
                        </span>
                      </div>
                    );
                  })}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
