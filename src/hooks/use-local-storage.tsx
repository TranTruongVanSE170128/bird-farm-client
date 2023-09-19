import { useState } from 'react'

function useLocalStorage<T>(key: string, defaultValue: T) {
  const [localStorageValue, setLocalStorageValue] = useState<T>(() => {
    try {
      const value = localStorage.getItem(key)

      if (value) {
        return JSON.parse(value)
      } else {
        localStorage.setItem(key, typeof defaultValue === 'string' ? defaultValue : JSON.stringify(defaultValue))
        return defaultValue
      }
    } catch (error) {
      localStorage.setItem(key, typeof defaultValue === 'string' ? defaultValue : JSON.stringify(defaultValue))
      return defaultValue
    }
  })

  const setLocalStorageStateValue = (valueOrFn: T) => {
    let newValue
    if (typeof valueOrFn === 'function') {
      const fn = valueOrFn
      newValue = fn(localStorageValue)
    } else {
      newValue = valueOrFn
    }
    localStorage.setItem(key, typeof newValue === 'string' ? newValue : JSON.stringify(newValue))
    setLocalStorageValue(newValue)
  }
  return { localStorageValue, setLocalStorageStateValue }
}

export default useLocalStorage
