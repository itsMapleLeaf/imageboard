export function onlyOnSelf (action: (...args: any[]) => any) {
  return (e: Event) => {
    if (e.target === e.currentTarget) action(e)
  }
}

export function preventDefault (action: (...args: any[]) => any) {
  return (e: Event) => {
    e.preventDefault()
    action(e)
  }
}
