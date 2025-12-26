import Container from '@/components/container';
import CustomSyntaxHighlighter from '@/components/custom-syntax-highlighter';
import InformationStatus from '@/components/information-status';
import { Tab, Tabs } from '@/components/tabs';

const Installation = () => (
  <Container className='my-8'>
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-3">Kurulum</h1>
        <p className="text-lg text-muted-foreground">
          MSI UI Kit'i projenize kolayca entegre edin ve hemen kullanmaya başlayın.
        </p>
      </div>

      {/* Framework Tabs */}
      <Tabs className='[&_button]:text-2xl w-full justify-start' wrapperClassName='w-full'>
        <Tab value='vite' label="Vite">
          <div className="space-y-6 mt-6">
            {/* Step 1: Create Project */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold mb-2">Projeyi Oluşturun</h2>
              <p className="text-muted-foreground mb-4">
                Öncelikle Vite ile yeni bir React projesi oluşturun:
              </p>
              <CustomSyntaxHighlighter content={`npm create vite@latest`} />
            </section>

            {/* Step 2: Install Tailwind CSS */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold mb-2">Tailwind CSS Kurulumu</h2>
              <p className="text-muted-foreground mb-4">
                MSI UI Kit, Tailwind CSS kullanır. Aşağıdaki komutu çalıştırarak Tailwind CSS'i yükleyin:
              </p>
              <CustomSyntaxHighlighter content='npm install tailwindcss @tailwindcss/vite' />
            </section>

            {/* Step 3: Configure Tailwind */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold mb-2">Tailwind CSS Yapılandırması</h2>
              <p className="text-muted-foreground mb-4">
                <code className="bg-neutral-light px-2 py-1 rounded">src/index.css</code> dosyasına aşağıdaki içeriği ekleyin:
              </p>
              <CustomSyntaxHighlighter title="src/index.css" content='@import "tailwindcss";' />
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold mb-2">tsconfig.json Dosyasını Güncelleyin</h2>
              <p className="text-muted-foreground mb-4">
                <code className="bg-neutral-light px-2 py-1 rounded">tsconfig.json</code> dosyasına aşağıdaki içeriği ekleyin:
              </p>
              <CustomSyntaxHighlighter title="tsconfig.json" addedHighlightLines={[7, 8, 9, 10, 11, 12]} content='{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
' />

            </section>
            <section className="space-y-4">
              <h2 className="text-xl font-semibold mb-2">tsconfig.app.json Dosyasını Güncelleyin</h2>
              <p className="text-muted-foreground mb-4">
                <code className="bg-neutral-light px-2 py-1 rounded">tsconfig.app.json</code> dosyasına aşağıdaki içeriği ekleyin:
              </p>
              <CustomSyntaxHighlighter title="tsconfig.app.json" addedHighlightLines={[4, 5, 6, 7]} content='{
  "compilerOptions": {
    ...
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    ...
}
' />
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold mb-2">Vite Config Güncellemesi</h2>
              <p className="text-muted-foreground mb-4">
                <code className="bg-neutral-light px-2 py-1 rounded">vite.config.ts</code> dosyasına aşağıdaki gibi Tailwind CSS eklentisini ekleyin:
              </p>
              <CustomSyntaxHighlighter content='npm install -D @types/node' />
              <CustomSyntaxHighlighter title="vite.config.ts" addedHighlightLines={[3, 4, 10, 12, 13, 14, 15, 16]} content={`import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
`} />
            </section>

            {/* Step 4: Initialize MSI UI Kit */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold mb-2">MSI UI Kit Başlatın</h2>
              <p className="text-muted-foreground mb-4">
                MSI UI Kit'i projenize kurmak için aşağıdaki komutu çalıştırın.
                Bu komut gerekli tüm bağımlılıkları ve yapılandırmaları otomatik olarak yükleyecektir.
              </p>
              <CustomSyntaxHighlighter content='npx msi-ui-cli init' />
            </section>

            {/* Step 5: Add Components */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold mb-2">Component Ekleyin</h2>
              <p className="text-muted-foreground mb-4">
                Artık projenize component eklemeye hazırsınız. İhtiyacınıza göre farklı yöntemler kullanabilirsiniz:
              </p>

              {/* Method 1 */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">
                  <span className="text-primary">•</span> Tek Component Eklemek
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Belirli bir component'i doğrudan ekleyin:
                </p>
                <CustomSyntaxHighlighter content='npx msi-ui-cli add button' />
              </div>

              {/* Method 2 */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">
                  <span className="text-primary">•</span> Birden Fazla Component Eklemek
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Aynı anda birden fazla component ekleyebilirsiniz:
                </p>
                <CustomSyntaxHighlighter content='npx msi-ui-cli add button input dialog' />
              </div>

              {/* Method 3 */}
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  <span className="text-primary">•</span> İnteraktif Seçim Modu
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Tüm component'leri listeleyin ve aralarından seçim yapın:
                </p>
                <CustomSyntaxHighlighter content='npx msi-ui-cli add' />
                <p className="text-sm text-muted-foreground mt-3">
                  Bu komut tüm mevcut component'leri listeleyecek ve tek veya çoklu seçim yapmanıza olanak tanıyacaktır.
                </p>
              </div>
            </section>

            {/* Success Message */}
            <InformationStatus className='w-full' title={
              <>
                <h3 className="text-lg font-semibold mb-2">
                  Tebrikler!
                </h3>
                <p className='text-base text-neutral-black'>
                  MSI UI Kit başarıyla kuruldu. Artık modern ve kullanıcı dostu component'leri projenizde kullanabilirsiniz.
                </p>
              </>
            } />
          </div>
        </Tab>

        <Tab value='nextjs' label="Next.js">
          <div className="space-y-6 mt-6">
            {/* Step 1: Create Project */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold mb-2">Projeyi Oluşturun</h2>
              <p className="text-muted-foreground mb-4">
                Next.js ile yeni bir proje oluşturun:
              </p>
              <CustomSyntaxHighlighter content='npx create-next-app@latest' />
              <p className="text-sm text-muted-foreground mt-3">
                Kurulum sırasında "Would you like to use Tailwind CSS?" sorusuna <strong>Yes</strong> deyin.
              </p>
            </section>

            {/* Step 2: Initialize MSI UI Kit */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold mb-2">MSI UI Kit Başlatın</h2>
              <p className="text-muted-foreground mb-4">
                MSI UI Kit'i projenize kurmak için aşağıdaki komutu çalıştırın:
              </p>
              <CustomSyntaxHighlighter content='npx msi-ui-cli init' />
            </section>

            {/* Step 3: Add Components */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold mb-2">Component Ekleyin</h2>
              <p className="text-muted-foreground mb-4">
                İhtiyacınız olan component'leri projenize ekleyin:
              </p>

              {/* Method 1 */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">
                  <span className="text-primary">•</span> Tek Component Eklemek
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Belirli bir component'i doğrudan ekleyin:
                </p>
                <CustomSyntaxHighlighter content='npx msi-ui-cli add button' />
              </div>

              {/* Method 2 */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">
                  <span className="text-primary">•</span> Birden Fazla Component Eklemek
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Aynı anda birden fazla component ekleyebilirsiniz:
                </p>
                <CustomSyntaxHighlighter content='npx msi-ui-cli add button input dialog' />
              </div>

              {/* Method 3 */}
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  <span className="text-primary">•</span> İnteraktif Seçim Modu
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Tüm component'leri listeleyin ve aralarından seçim yapın:
                </p>
                <CustomSyntaxHighlighter content='npx msi-ui-cli add' />
                <p className="text-sm text-muted-foreground mt-3">
                  Bu komut tüm mevcut component'leri listeleyecek ve tek veya çoklu seçim yapmanıza olanak tanıyacaktır.
                </p>
              </div>
            </section>

            {/* Success Message */}
            <InformationStatus className='w-full' title={
              <>
                <h3 className="text-lg font-semibold mb-2">
                  Tebrikler!
                </h3>
                <p className='text-base text-neutral-black'>
                  MSI UI Kit başarıyla kuruldu. Artık modern ve kullanıcı dostu component'leri projenizde kullanabilirsiniz.
                </p>
              </>
            } />
          </div>
        </Tab>
      </Tabs>
    </div>
  </Container>
);

export default Installation;
