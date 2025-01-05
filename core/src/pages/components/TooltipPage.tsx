import Button from '@/components/Button';
import Tooltip from '@/components/Tooltip';

const TooltipPage = () => (
  <>
    <h1 className="mb-4 text-2xl font-bold">Tooltip Örnekleri</h1>
    <div className="container mx-auto flex items-center justify-center p-4">

      <div className="flex flex-col space-y-20 [&_*_button]:w-[300px]">
        <Tooltip content="Bu bir basit tooltip örneğidir." position="top">
          <Button className="rounded px-4 py-2 text-white">
            Hover (Top)
          </Button>
        </Tooltip>

        <Tooltip content={['Row 1', 'Row 2', 'Row 3', 'Row 4']} position="right">
          <Button color="secondary" className="rounded px-4 py-2 text-white">
            Hover (Right)
          </Button>
        </Tooltip>

        <Tooltip
          content="Bu tooltip 1 saniye gecikmeyle görünür."
          position="bottom"
          delay={1000}
        >
          <Button color="tetriary" className="rounded px-4 py-2 text-white">
            Hover (Bottom, 1s Delay)
          </Button>
        </Tooltip>

        <Tooltip
          content="Özel stilli tooltip"
          position="left"
          className="custom-tooltip-container"
          contentClassName="custom-tooltip-content"
          arrow={false}
        >
          <Button className="rounded px-4 py-2 text-white">
            Hover (Left, Custom Style, No Arrow)
          </Button>
        </Tooltip>
      </div>
    </div>
  </>
);

export default TooltipPage;
