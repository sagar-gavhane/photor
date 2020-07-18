export const getImages = async () => {
  const response = await fetch('https://picsum.photos/v2/list').then((r) =>
    r.json()
  )
  return response
}
