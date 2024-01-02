import type { InjectionKey } from 'vue'

interface State {
  isDialogOpen: MaybeRef<boolean>
  currentNarrativeIndex: MaybeRef<number>
  currentNarrativeSlideIndex: MaybeRef<number>

  openDialog: (narrativeIndex?: number) => void
  closeDialog: () => void
  goToPreviousNarrative: () => void
  goToNextNarrative: () => void
  goToNextNarrativeSlide: () => void
  goToPreviousNarrativeSlide: () => void
}

export const StateInjectionKey = Symbol('StateInjectionKey') as InjectionKey<State>
