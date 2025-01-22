import { useMachine } from '@xstate/react';
import { StateMachine } from 'xstate';
import { loadPersistedState, persistState, FinancialContext } from '@financial-flow-viz/core';
import React from 'react';

export function usePersistentMachine<TContext, TEvent extends { type: string }>(
  machine: StateMachine<TContext, any, TEvent>
) {
  // Load persisted state and merge with machine's initial context
  const persistedState = loadPersistedState();
  const machineWithPersistedState = machine.withContext({
    ...machine.initialState.context,
    ...persistedState,
  });

  const result = useMachine(machineWithPersistedState, {
    actions: {
      // Add persistence to all actions
      ...machine.options.actions,
      persist: (context: TContext) => persistState(context as unknown as FinancialContext),
    },
    guards: machine.options.guards,
    services: machine.options.services,
  });

  const [state] = result;

  // Persist state after each update
  React.useEffect(() => {
    persistState(state.context as unknown as FinancialContext);
  }, [state.context]);

  return result;
}