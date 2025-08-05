import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Star, ArrowLeft, ShoppingCart } from 'lucide-react';
import { useProduct } from '@/hooks/useProducts';
import { addToCart } from '@/store/cartSlice';
import Header from '@/components/Header';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { data: product, isLoading, error } = useProduct(id!);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
      toast({
        title: "Added to cart!",
        description: `${product.title} has been added to your cart.`,
      });
    }
  };

  if (isLoading) {
    return (
      <>
        <SEO title="Loading Product..." />
        <div className="min-h-screen bg-background">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Skeleton className="aspect-square w-full" />
              <div className="space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-10 w-1/3" />
              </div>
            </div>
          </main>
        </div>
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <SEO title="Product Not Found" />
        <div className="min-h-screen bg-background">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
              <p className="text-muted-foreground mb-6">
                The product you're looking for doesn't exist.
              </p>
              <Link to="/">
                <Button>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
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
      <SEO 
        title={product.title}
        description={product.description}
        keywords={`${product.category}, ${product.title}, online shopping, ecommerce`}
        url={`/product/${product.id}`}
        image={product.image}
      />
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <Link to="/" className="inline-flex items-center text-primary hover:underline mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="aspect-square bg-muted rounded-lg overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-contain p-8"
              />
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <Badge variant="secondary" className="mb-3">
                  {product.category}
                </Badge>
                <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{product.rating.rate}</span>
                    <span className="text-muted-foreground">
                      ({product.rating.count} reviews)
                    </span>
                  </div>
                </div>

                <p className="text-4xl font-bold text-primary mb-6">
                  ${product.price.toFixed(2)}
                </p>
              </div>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-3">Product Description</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <Button 
                  onClick={handleAddToCart}
                  size="lg" 
                  className="w-full bg-gradient-primary hover:shadow-elegant transition-all duration-300"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                
                <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    Free shipping on orders over $50
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    30-day return policy
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ProductDetail;