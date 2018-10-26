import throttleFn from 'lodash.throttle'
import * as debounceFn from 'lodash.debounce'

/**
 *
 * @export
 * @param {number} [milliseconds=0]
 * @param {any} [options={}]
 * @returns
 */
export function throttle (milliseconds: number = 0, options = {}) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value
    descriptor.value = throttleFn(originalMethod, milliseconds, options)
    return descriptor
  }
}

/**
 *
 * @export
 * @param {number} [milliseconds=0]
 * @param {any} [options={}]
 * @returns
 */
export function debounce (milliseconds: number = 0, options = {}) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value
    descriptor.value = debounceFn(originalMethod, milliseconds, options)
    return descriptor
  }
}
