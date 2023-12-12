import tailwindConfig from '#tailwind-config'

type BreakpointKey = keyof typeof tailwindConfig.theme.screens

export const useTailwindBreakpoint = (breakpoint: BreakpointKey) => {
  return useMediaQuery(`(min-width: ${tailwindConfig.theme.screens[breakpoint]})`)
}
