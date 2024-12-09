import { useQuery } from '@apollo/client'
import { GET_ITEMS } from '../lib/graphql/queries'

export const ItemList = () => {
  const { loading, error, data } = useQuery(GET_ITEMS)

  if (loading) return <p>로딩중...</p>
  if (error) return <p>에러 발생: {error.message}</p>

  return (
    <div>
      {data.items.map((item: { id: string; title: string; content: string }) => (
        <div key={item.id}>
          <h2>{item.title}</h2>
          <p>{item.content}</p>
        </div>
      ))}
    </div>
  )
} 