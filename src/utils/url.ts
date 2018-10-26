export function getFirstUrlParam (pathName: string) {
  let result = '/'

  const pathnameSplit = pathName.split('/')

  if (pathnameSplit[0] === '') {
    result += pathnameSplit[1]
  }

  result += pathnameSplit[0]

  return result
}
