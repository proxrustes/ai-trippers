export async function getHeader(req: Request, header: string) {
    const headers = await req.headers
    let result = null
    try {
      result = headers[header]
    } catch {
      result = headers.get(header)
    }
    return result
  }
  
  export async function getBody(req: Request) {
    let result = null
    try {
      result = await req.json()
    } catch {
      result = await req.body
    }
    return result
  }