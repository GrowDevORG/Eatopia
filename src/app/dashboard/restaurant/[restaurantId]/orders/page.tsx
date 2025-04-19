import { OrdersDisplay } from '@/components/orders-display'
import React from 'react'

const page = async ({ params }: { params: { restaurantId: string } }) => {
    const { restaurantId } = await params;
  return (
    <div>
        <OrdersDisplay  restaurantId={restaurantId} />
    </div>
  )
}

export default page