import { useProducts } from '@/hooks/useProducts';
import ProductCard from '@/components/ProductCard';
import Header from '@/components/Header';
import SEO from '@/components/SEO';
import { Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Home = () => {
  const { data: products, isLoading, error } = useProducts();

  if (error) {
    return (
      <>
        <SEO />
        <div className="min-h-screen bg-background">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Failed to load products. Please try again later.
              </AlertDescription>
            </Alert>
          </main>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO />
      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Hero Section */}
          <section className="relative bg-gradient-hero border-b">
            <div className="container mx-auto px-4 py-16 text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
                Welcome to Next Store Quest
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Discover amazing products at unbeatable prices. Shop the latest trends with fast shipping and excellent customer service.
              </p>
            </div>
          </section>

          {/* Products Section */}
          <section className="container mx-auto px-4 py-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
              <p className="text-muted-foreground text-lg">
                Explore our carefully curated collection of premium products
              </p>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-2 text-muted-foreground">Loading products...</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products?.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </>
  );
};

export default Home;