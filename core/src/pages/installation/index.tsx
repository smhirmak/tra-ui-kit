import Container from '@/components/container';
import CustomSyntaxHighlighter from '@/components/custom-syntax-highlighter';

const initCommand = 'npx msi-ui-cli init';
const addSingleComponent = 'npx msi-ui-cli add button';
const addMultipleComponents = 'npx msi-ui-cli add button input dialog';
const addInteractive = 'npx msi-ui-cli add';

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

      {/* Step 1 */}
      <section className="space-y-4">
        <div className="flex items-baseline gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
            1
          </span>
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-2">Projeyi Başlatın</h2>
            <p className="text-muted-foreground mb-4">
              MSI UI Kit'i projenize kurmak için aşağıdaki komutu çalıştırın.
              Bu komut gerekli tüm bağımlılıkları ve yapılandırmaları otomatik olarak yükleyecektir.
            </p>
            <CustomSyntaxHighlighter content={initCommand} />
          </div>
        </div>
      </section>

      {/* Step 2 */}
      <section className="space-y-4">
        <div className="flex items-baseline gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
            2
          </span>
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-2">Component Ekleyin</h2>
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
              <CustomSyntaxHighlighter content={addSingleComponent} />
            </div>

            {/* Method 2 */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">
                <span className="text-primary">•</span> Birden Fazla Component Eklemek
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Aynı anda birden fazla component ekleyebilirsiniz:
              </p>
              <CustomSyntaxHighlighter content={addMultipleComponents} />
            </div>

            {/* Method 3 */}
            <div>
              <h3 className="text-lg font-semibold mb-2">
                <span className="text-primary">•</span> İnteraktif Seçim Modu
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Tüm component'leri listeleyin ve aralarından seçim yapın:
              </p>
              <CustomSyntaxHighlighter content={addInteractive} />
              <p className="text-sm text-muted-foreground mt-3">
                Bu komut tüm mevcut component'leri listeleyecek ve tek veya çoklu seçim yapmanıza olanak tanıyacaktır.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Message */}
      <div className="mt-8 p-6 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
        <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
          🎉 Tebrikler!
        </h3>
        <p className="text-green-800 dark:text-green-200">
          MSI UI Kit başarıyla kuruldu. Artık modern ve kullanıcı dostu component'leri projenizde kullanabilirsiniz.
        </p>
      </div>
    </div>
  </Container>
);

export default Installation;
