import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Calendar, Package, Eye, ShoppingBag } from 'lucide-react';
import { RootState } from '@/store/store';
import { Order } from '@/store/ordersSlice';
import Header from '@/components/Header';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

const OrderDetailModal = ({ order }: { order: Order }) => {
  return (
    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Order Details - {order.id}</DialogTitle>
      </DialogHeader>
      
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-semibold">Customer</p>
            <p className="text-muted-foreground">{order.customerName}</p>
          </div>
          <div>
            <p className="font-semibold">Order Date</p>
            <p className="text-muted-foreground">
              {new Date(order.orderDate).toLocaleDateString()}
            </p>
          </div>
          <div className="col-span-2">
            <p className="font-semibold">Shipping Address</p>
            <p className="text-muted-foreground">{order.shippingAddress}</p>
          </div>
          <div>
            <p className="font-semibold">Phone</p>
            <p className="text-muted-foreground">{order.phoneNumber}</p>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="font-semibold mb-4">Order Items</h3>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex gap-4 p-3 border rounded-lg">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-12 h-12 object-contain bg-muted rounded"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-sm line-clamp-1">
                    {item.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Qty: {item.quantity} × ${item.price.toFixed(2)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <Separator className="my-4" />
          
          <div className="flex justify-between items-center text-lg font-bold">
            <span>Total Amount:</span>
            <span className="text-primary">${order.totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

const Orders = () => {
  const orders = useSelector((state: RootState) => state.orders.orders);

  if (orders.length === 0) {
    return (
      <>
        <SEO title="My Orders - Order History" />
        <div className="min-h-screen bg-background">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <div className="text-center py-12">
              <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h1 className="text-2xl font-bold mb-2">No orders yet</h1>
              <p className="text-muted-foreground mb-6">
                Start shopping to see your orders here!
              </p>
              <Link to="/">
                <Button>
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Start Shopping
                </Button>
              </Link>
            </div>
          </main>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO title="My Orders - Order History" />
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">My Orders</h1>
            <Badge variant="secondary">
              {orders.length} order{orders.length !== 1 ? 's' : ''}
            </Badge>
          </div>

          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id} className="overflow-hidden">
                <CardHeader className="bg-muted/50">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(order.orderDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </div>
                    </div>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <OrderDetailModal order={order} />
                    </Dialog>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground">Customer</p>
                      <p className="font-medium">{order.customerName}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground">Total Items</p>
                      <p className="font-medium">{order.totalItems}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground">Total Amount</p>
                      <p className="font-bold text-primary text-lg">
                        ${order.totalAmount.toFixed(2)}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground">Status</p>
                      <Badge variant="secondary" className="bg-success/10 text-success">
                        Confirmed
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm font-semibold text-muted-foreground mb-2">
                      Order Items Preview
                    </p>
                    <div className="flex gap-2 overflow-x-auto">
                      {order.items.slice(0, 4).map((item) => (
                        <img
                          key={item.id}
                          src={item.image}
                          alt={item.title}
                          className="w-12 h-12 object-contain bg-muted rounded flex-shrink-0"
                        />
                      ))}
                      {order.items.length > 4 && (
                        <div className="w-12 h-12 bg-muted rounded flex items-center justify-center text-xs font-semibold text-muted-foreground">
                          +{order.items.length - 4}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export default Orders;