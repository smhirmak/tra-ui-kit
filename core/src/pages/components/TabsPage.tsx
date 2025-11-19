/* eslint-disable no-nested-ternary */
import { PlusIcon, WarningIcon } from '@phosphor-icons/react';
import { useState } from 'react';
import Button from '@/components/button';
import { RadioGroup, RadioGroupItem } from '@/components/radio-buttons';
import { Tab, Tabs } from '@/components/tabs-1';

const TabsPage = () => {
  const [activeTab, setActiveTab] = useState<string>('tab3');
  const [tabContentPlacement, setTabContentPlacement] = useState<'top' | 'right' | 'bottom' | 'left'>('bottom');

  const handleTabChange = (newValue: string) => {
    setActiveTab(newValue);
  };
  return (
    <div className="mb-6 border-b-2 pb-6">
      <p className="text-4xl underline">Tabs</p>
      <div className="mt-2 space-y-2 border-t-2 py-2">
        <p className="my-2 text-xl">Default:</p>
        <div className="flex space-x-2 pb-2">
          <Tabs activeTab={activeTab} size="sm" onChange={handleTabChange}>
            <Tab label="Tab 1" value="tab1">
              Content for Tab 1
            </Tab>
            <Tab label="Tab 2" value="tab2">
              Content for Tab 2
            </Tab>
            <Tab label="Tab 3" value="tab3">
              Content for Tab 3
            </Tab>
          </Tabs>
          <Tabs activeTab={activeTab} size="default" onChange={handleTabChange}>
            <Tab label="Tab 1" value="tab1">
              Content for Tab 1
            </Tab>
            <Tab label="Tab 2" value="tab2">
              Content for Tab 2
            </Tab>
            <Tab label="Tab 3" value="tab3">
              Content for Tab 3
            </Tab>
          </Tabs>
          <Tabs activeTab={activeTab} size="lg" onChange={handleTabChange}>
            <Tab label="Tab 1" value="tab1">
              Content for Tab 1
            </Tab>
            <Tab label="Tab 2" value="tab2">
              Content for Tab 2
            </Tab>
            <Tab label="Tab 3" value="tab3">
              Content for Tab 3
            </Tab>
          </Tabs>
        </div>
        <p className="my-2 text-xl">Solid:</p>
        <div className="flex space-x-2 pb-2">
          <Tabs variant="solid" activeTab={activeTab} size="sm" onChange={handleTabChange}>
            <Tab label="Tab 1" value="tab1">
              Content for Tab 1
            </Tab>
            <Tab label="Tab 2" value="tab2">
              Content for Tab 2
            </Tab>
            <Tab label="Tab 3" value="tab3">
              Content for Tab 3
            </Tab>
          </Tabs>
          <Tabs variant="solid" activeTab={activeTab} size="default" onChange={handleTabChange}>
            <Tab label="Tab 1" value="tab1">
              Content for Tab 1
            </Tab>
            <Tab label="Tab 2" value="tab2">
              Content for Tab 2
            </Tab>
            <Tab label="Tab 3" value="tab3">
              Content for Tab 3
            </Tab>
          </Tabs>
          <Tabs variant="solid" activeTab={activeTab} size="lg" onChange={handleTabChange}>
            <Tab label="Tab 1" value="tab1">
              Content for Tab 1
            </Tab>
            <Tab label="Tab 2" value="tab2">
              Content for Tab 2
            </Tab>
            <Tab label="Tab 3" value="tab3">
              Content for Tab 3
            </Tab>
          </Tabs>
        </div>
        <p className="my-2 text-xl">Outlined:</p>
        <div className="flex space-x-2 pb-2">
          <Tabs variant="outlined" activeTab={activeTab} size="sm" onChange={handleTabChange}>
            <Tab label="Tab 1" value="tab1">
              Content for Tab 1
            </Tab>
            <Tab label="Tab 2" value="tab2">
              Content for Tab 2
            </Tab>
            <Tab label="Tab 3" value="tab3">
              Content for Tab 3
            </Tab>
          </Tabs>
          <Tabs variant="outlined" activeTab={activeTab} size="default" onChange={handleTabChange}>
            <Tab label="Tab 1" value="tab1">
              Content for Tab 1
            </Tab>
            <Tab label="Tab 2" value="tab2">
              Content for Tab 2
            </Tab>
            <Tab label="Tab 3" value="tab3">
              Content for Tab 3
            </Tab>
          </Tabs>
          <Tabs variant="outlined" activeTab={activeTab} size="lg" onChange={handleTabChange}>
            <Tab label="Tab 1" value="tab1">
              Content for Tab 1
            </Tab>
            <Tab label="Tab 2" value="tab2">
              Content for Tab 2
            </Tab>
            <Tab label="Tab 3" value="tab3">
              Content for Tab 3
            </Tab>
          </Tabs>
        </div>
        <p className="my-2 text-xl">Split:</p>
        <div className="flex space-x-2 pb-2">
          <Tabs variant="split" activeTab={activeTab} size="sm" onChange={handleTabChange}>
            <Tab label="Tab 1" value="tab1">
              Content for Tab 1
            </Tab>
            <Tab label="Tab 2" value="tab2">
              Content for Tab 2
            </Tab>
            <Tab label="Tab 3" value="tab3">
              Content for Tab 3
            </Tab>
          </Tabs>
          <Tabs variant="split" activeTab={activeTab} size="default" onChange={handleTabChange}>
            <Tab label="Tab 1" value="tab1">
              Content for Tab 1
            </Tab>
            <Tab label="Tab 2" value="tab2">
              Content for Tab 2
            </Tab>
            <Tab label="Tab 3" value="tab3">
              Content for Tab 3
            </Tab>
          </Tabs>
          <Tabs variant="split" activeTab={activeTab} size="lg" onChange={handleTabChange}>
            <Tab label="Tab 1" value="tab1">
              Content for Tab 1
            </Tab>
            <Tab label="Tab 2" value="tab2">
              Content for Tab 2
            </Tab>
            <Tab label="Tab 3" value="tab3">
              Content for Tab 3
            </Tab>
          </Tabs>
        </div>
        <p className="my-2 text-xl">Solid Rounded:</p>
        <div className="flex flex-wrap space-x-2 pb-2">
          {(['none', 'sm', 'default', 'lg', 'full'] as ('none' | 'sm' | 'default' | 'lg' | 'full')[]).map(e => (
            <Tabs variant="solid" radius={e} activeTab={activeTab} size="lg" onChange={handleTabChange}>
              <Tab label="Tab 1" value="tab1">
                Content for Tab 1
              </Tab>
              <Tab label="Tab 2" value="tab2">
                Content for Tab 2
              </Tab>
              <Tab label="Tab 3" value="tab3">
                Content for Tab 3
              </Tab>
            </Tabs>
          ))}
        </div>
        <p className="my-2 text-xl">Outlined Rounded:</p>
        <div className="flex flex-wrap space-x-2 pb-2">
          {(['none', 'sm', 'default', 'lg', 'full'] as ('none' | 'sm' | 'default' | 'lg' | 'full')[]).map((e: 'none' | 'sm' | 'default' | 'lg' | 'full') => (
            <Tabs variant="outlined" radius={e} activeTab={activeTab} size="lg" onChange={handleTabChange}>
              <Tab label="Tab 1" value="tab1">
                Content for Tab 1
              </Tab>
              <Tab
                label={(
                  <span className="flex items-center">
                    <PlusIcon />
                    &nbsp;
                    Tab 2
                  </span>
                )}
                value="tab2"
              >
                Content for Tab 2
              </Tab>
              <Tab label="Tab 3" value="tab3">
                Content for Tab 3
              </Tab>
            </Tabs>
          ))}
        </div>
        <p className="my-2 text-xl">Split Rounded:</p>
        <div className="flex flex-wrap space-x-2 pb-2">
          {(['none', 'sm', 'default', 'lg', 'full'] as ('none' | 'sm' | 'default' | 'lg' | 'full')[]).map((e: 'none' | 'sm' | 'default' | 'lg' | 'full') => (
            <Tabs variant="split" radius={e} activeTab={activeTab} size="lg" onChange={handleTabChange}>
              <Tab label="Tab 1" value="tab1">
                Content for Tab 1
              </Tab>
              <Tab label="Tab 2" value="tab2">
                Content for Tab 2
              </Tab>
              <Tab label="Tab 3" value="tab3">
                Content for Tab 3
              </Tab>
            </Tabs>
          ))}
        </div>
        <p className="my-2 text-xl">Vertical Direction:</p>
        <div className="flex flex-wrap space-x-2 pb-2">
          {['default', 'solid', 'outlined', 'split'].map((e: string) => (
            <Tabs variant={e as 'default' | 'split' | 'solid' | 'outlined'} direction="vertical" activeTab={activeTab} selectorClassName="bg-error/50" size="lg" onChange={handleTabChange}>
              <Tab label="Tab 1" value="tab1">
                Content for Tab 1
              </Tab>
              <Tab label="Tab 2" value="tab2">
                Content for Tab 2
              </Tab>
              <Tab label="Tab 3" value="tab3">
                Content for Tab 3
              </Tab>
            </Tabs>
          ))}
        </div>
        <div className="flex flex-wrap space-x-6">
          <div>
            <p className="my-2 text-xl">Vertival Direction and Dynamic Content Placement and Default</p>
            <div className="flex flex-wrap space-x-2 pb-2">
              <RadioGroup onChange={e => setTabContentPlacement(e as 'top' | 'right' | 'bottom' | 'left')} className="bg-primary-15 flex w-full flex-col items-center">
                <RadioGroupItem id="top" label="Top" value="top" />
                <RadioGroupItem id="right" label="Right" value="right" />
                <RadioGroupItem id="bottom" label="Bottom" value="bottom" />
                <RadioGroupItem id="left" label="Left" value="left" />
              </RadioGroup>
              <Tabs
                contentPlacement={tabContentPlacement}
                contentClasName="p-4 bg-disabled-dark/40 rounded-lg"
                variant="default"
                direction="vertical"
                activeTab={activeTab}
                size="lg"
                onChange={handleTabChange}
              >
                <Tab label="Tab 1" value="tab1">
                  Content for Tab 1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum quas quos iste architecto impedit est non excepturi aperiam recusandae cum!
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium, fugiat! Perspiciatis omnis consequatur mollitia eligendi quibusdam eius explicabo, nemo tempore?
                </Tab>
                <Tab label="Tab 2" value="tab2">
                  Content for Tab 2 Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum quas quos iste architecto impedit est non excepturi aperiam recusandae cum!
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium, fugiat! Perspiciatis omnis consequatur mollitia eligendi quibusdam eius explicabo, nemo tempore?
                </Tab>
                <Tab label="Tab 3" value="tab3">
                  Content for Tab 3 Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum quas quos iste architecto impedit est non excepturi aperiam recusandae cum!
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium, fugiat! Perspiciatis omnis consequatur mollitia eligendi quibusdam eius explicabo, nemo tempore?
                </Tab>
              </Tabs>
            </div>
          </div>
          <div>
            <p className="my-2 text-xl">Vertival Direction and Dynamic Content Placement and Outlined</p>
            <div className="flex flex-wrap space-x-2 pb-2">
              <Tabs
                contentPlacement={tabContentPlacement}
                contentClasName="p-4 bg-disabled-dark/40 rounded-lg"
                variant="outlined"
                direction="vertical"
                activeTab={activeTab}
                size="lg"
                onChange={handleTabChange}
              >
                <Tab label="Tab 1" value="tab1">
                  Content for Tab 1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum quas quos iste architecto impedit est non excepturi aperiam recusandae cum!
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium, fugiat! Perspiciatis omnis consequatur mollitia eligendi quibusdam eius explicabo, nemo tempore?
                </Tab>
                <Tab label="Tab 2" value="tab2">
                  Content for Tab 2 Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum quas quos iste architecto impedit est non excepturi aperiam recusandae cum!
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium, fugiat! Perspiciatis omnis consequatur mollitia eligendi quibusdam eius explicabo, nemo tempore?
                </Tab>
                <Tab label="Tab 3" value="tab3">
                  Content for Tab 3 Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum quas quos iste architecto impedit est non excepturi aperiam recusandae cum!
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium, fugiat! Perspiciatis omnis consequatur mollitia eligendi quibusdam eius explicabo, nemo tempore?
                </Tab>
              </Tabs>
            </div>
          </div>
          <div>
            <p className="my-2 text-xl">Vertival Direction and Dynamic Content Placement and Solid</p>
            <div className="flex flex-wrap space-x-2 pb-2">
              <Tabs
                contentPlacement={tabContentPlacement}
                contentClasName="p-4 bg-disabled-dark/40 rounded-lg"
                variant="solid"
                direction="vertical"
                activeTab={activeTab}
                size="lg"
                onChange={handleTabChange}
              >
                <Tab label="Tab 1" value="tab1">
                  Content for Tab 1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum quas quos iste architecto impedit est non excepturi aperiam recusandae cum!
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium, fugiat! Perspiciatis omnis consequatur mollitia eligendi quibusdam eius explicabo, nemo tempore?
                </Tab>
                <Tab label="Tab 2" value="tab2">
                  Content for Tab 2 Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum quas quos iste architecto impedit est non excepturi aperiam recusandae cum!
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium, fugiat! Perspiciatis omnis consequatur mollitia eligendi quibusdam eius explicabo, nemo tempore?
                </Tab>
                <Tab label="Tab 3" value="tab3">
                  Content for Tab 3 Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum quas quos iste architecto impedit est non excepturi aperiam recusandae cum!
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium, fugiat! Perspiciatis omnis consequatur mollitia eligendi quibusdam eius explicabo, nemo tempore?
                </Tab>
              </Tabs>
            </div>
          </div>
          <div>
            <p className="my-2 text-xl">Vertival Direction and Dynamic Content Placement and Split</p>
            <div className="flex flex-wrap space-x-2 pb-2">
              <Tabs
                contentPlacement={tabContentPlacement}
                contentClasName="p-4 bg-disabled-dark/40 rounded-lg text-justify"
                variant="split"
                direction="vertical"
                activeTab={activeTab}
                size="lg"
                onChange={handleTabChange}
              >
                <Tab label="Tab 1" value="tab1">
                  Content for Tab 1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum quas quos iste architecto impedit est non excepturi aperiam recusandae cum!
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium, fugiat! Perspiciatis omnis consequatur mollitia eligendi quibusdam eius explicabo, nemo tempore?
                </Tab>
                <Tab label="Tab 2" value="tab2">
                  Content for Tab 2 Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum quas quos iste architecto impedit est non excepturi aperiam recusandae cum!
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium, fugiat! Perspiciatis omnis consequatur mollitia eligendi quibusdam eius explicabo, nemo tempore?
                </Tab>
                <Tab label="Tab 3" value="tab3">
                  Content for Tab 3 Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum quas quos iste architecto impedit est non excepturi aperiam recusandae cum!
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium, fugiat! Perspiciatis omnis consequatur mollitia eligendi quibusdam eius explicabo, nemo tempore?
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
        <div>
          <p className="my-2 text-xl">Vertival Direction and Dynamic Content Placement and Default</p>
          <div className="flex flex-wrap space-x-2 pb-2">
            <Tabs
              contentPlacement={tabContentPlacement}
              contentClasName="p-4 bg-disabled-dark/40 rounded-lg text-justify"
              variant="default"
              direction="vertical"
              activeTab={activeTab}
              size="lg"
              onChange={handleTabChange}
            >
              <Tab
                label={
                  (
                    <span className="flex w-max gap-2">
                      <WarningIcon className="text-error size-6" />
                      Tab 1
                    </span>
                  )
                }
                value="tab1"
              >
                Content for Tab 1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum quas quos iste architecto impedit est non excepturi aperiam recusandae cum!
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium, fugiat! Perspiciatis omnis consequatur mollitia eligendi quibusdam eius explicabo, nemo tempore?
              </Tab>
              <Tab
                label={
                  (
                    <span className="flex w-max gap-2">
                      Tab 2
                      <WarningIcon className="text-tetriary size-6" />
                    </span>
                  )
                }
                value="tab2"
              >
                Content for Tab 2 Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum quas quos iste architecto impedit est non excepturi aperiam recusandae cum!
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium, fugiat! Perspiciatis omnis consequatur mollitia eligendi quibusdam eius explicabo, nemo tempore?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, debitis.
              </Tab>
              <Tab
                label={
                  (
                    <span className="flex w-max gap-2">
                      <WarningIcon className="text-error size-6" />
                      Tab 3
                      <WarningIcon className="text-error size-6" />
                    </span>
                  )
                }
                value="tab3"
              >
                Content for Tab 3 Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum quas quos iste architecto impedit est non excepturi aperiam recusandae cum!
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium, fugiat! Perspiciatis omnis consequatur mollitia eligendi quibusdam eius explicabo, nemo tempore?
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque ratione molestiae obcaecati quae dolor quis eaque facere voluptas corporis porro.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, dolore. Blanditiis aliquid, architecto dolores cum quisquam necessitatibus similique maiores omnis est,
                fugiat beatae aliquam earum quasi tenetur quidem! Perferendis, voluptates.
              </Tab>
            </Tabs>
          </div>
        </div>
        <p className="my-2 text-xl">Vertival Direction and Dynamic Content Placement and Outlined</p>
        <div className="flex flex-wrap space-x-2 pb-2">
          <Tabs
            contentPlacement={tabContentPlacement}
            contentClasName="p-4 bg-disabled-dark/40 rounded-lg text-justify"
            variant="outlined"
            direction="vertical"
            activeTab={activeTab}
            size="lg"
            onChange={handleTabChange}
          >
            <Tab
              label={
                (
                  <span className="flex w-max gap-2">
                    <WarningIcon className="text-error size-6" />
                    Tab 1
                  </span>
                )
              }
              value="tab1"
            >
              Content for Tab 1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum quas quos iste architecto impedit est non excepturi aperiam recusandae cum!
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium, fugiat! Perspiciatis omnis consequatur mollitia eligendi quibusdam eius explicabo, nemo tempore?
            </Tab>
            <Tab
              label={
                (
                  <span className="flex w-max gap-2">
                    Tab 2
                    <WarningIcon className="text-tetriary size-6" />
                  </span>
                )
              }
              value="tab2"
            >
              Content for Tab 2 Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum quas quos iste architecto impedit est non excepturi aperiam recusandae cum!
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium, fugiat! Perspiciatis omnis consequatur mollitia eligendi quibusdam eius explicabo, nemo tempore?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, debitis.
            </Tab>
            <Tab
              label={
                (
                  <span className="flex w-max gap-2">
                    <WarningIcon className="text-error size-6" />
                    Tab 3
                    <WarningIcon className="text-error size-6" />
                  </span>
                )
              }
              value="tab3"
            >
              Content for Tab 3 Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum quas quos iste architecto impedit est non excepturi aperiam recusandae cum!
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium, fugiat! Perspiciatis omnis consequatur mollitia eligendi quibusdam eius explicabo, nemo tempore?
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque ratione molestiae obcaecati quae dolor quis eaque facere voluptas corporis porro.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, dolore. Blanditiis aliquid, architecto dolores cum quisquam necessitatibus similique maiores omnis est,
              fugiat beatae aliquam earum quasi tenetur quidem! Perferendis, voluptates.
            </Tab>
          </Tabs>
        </div>
        <p className="my-2 text-xl">Vertival Direction and Dynamic Content Placement and Solid</p>
        <div className="flex flex-wrap space-x-2 pb-2">
          <Tabs
            contentPlacement={tabContentPlacement}
            contentClasName="p-4 bg-disabled-dark/40 rounded-lg text-justify"
            variant="solid"
            direction="vertical"
            activeTab={activeTab}
            size="lg"
            onChange={handleTabChange}
          >
            <Tab
              label={
                (
                  <span className="flex w-max gap-2">
                    <WarningIcon className="text-error size-6" />
                    Tab 1
                  </span>
                )
              }
              value="tab1"
            >
              Content for Tab 1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum quas quos iste architecto impedit est non excepturi aperiam recusandae cum!
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium, fugiat! Perspiciatis omnis consequatur mollitia eligendi quibusdam eius explicabo, nemo tempore?
            </Tab>
            <Tab
              label={
                (
                  <span className="flex w-max gap-2">
                    Tab 2
                    <WarningIcon className="text-tetriary size-6" />
                  </span>
                )
              }
              value="tab2"
            >
              Content for Tab 2 Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum quas quos iste architecto impedit est non excepturi aperiam recusandae cum!
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium, fugiat! Perspiciatis omnis consequatur mollitia eligendi quibusdam eius explicabo, nemo tempore?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, debitis.
            </Tab>
            <Tab
              label={
                (
                  <span className="flex w-max gap-2">
                    <WarningIcon className="text-error size-6" />
                    Tab 3
                    <WarningIcon className="text-error size-6" />
                  </span>
                )
              }
              value="tab3"
            >
              Content for Tab 3 Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum quas quos iste architecto impedit est non excepturi aperiam recusandae cum!
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium, fugiat! Perspiciatis omnis consequatur mollitia eligendi quibusdam eius explicabo, nemo tempore?
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque ratione molestiae obcaecati quae dolor quis eaque facere voluptas corporis porro.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, dolore. Blanditiis aliquid, architecto dolores cum quisquam necessitatibus similique maiores omnis est,
              fugiat beatae aliquam earum quasi tenetur quidem! Perferendis, voluptates.
            </Tab>
          </Tabs>
        </div>
        <p className="my-2 text-xl">Vertival Direction and Dynamic Content Placement and Split</p>
        <div className="flex flex-wrap space-x-2 pb-2">
          <Tabs
            contentPlacement={tabContentPlacement}
            contentClasName="p-4 bg-disabled-dark/40 rounded-lg text-justify"
            variant="split"
            direction="vertical"
            activeTab={activeTab}
            size="lg"
            onChange={handleTabChange}
          >
            <Tab
              label={
                (
                  <span className="flex w-max gap-2">
                    <WarningIcon className="text-error size-6" />
                    Tab 1
                  </span>
                )
              }
              value="tab1"
            >
              Content for Tab 1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum quas quos iste architecto impedit est non excepturi aperiam recusandae cum!
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium, fugiat! Perspiciatis omnis consequatur mollitia eligendi quibusdam eius explicabo, nemo tempore?
            </Tab>
            <Tab
              label={
                (
                  <span className="flex w-max gap-2">
                    Tab 2
                    <WarningIcon className="text-tetriary size-6" />
                  </span>
                )
              }
              value="tab2"
            >
              Content for Tab 2 Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum quas quos iste architecto impedit est non excepturi aperiam recusandae cum!
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium, fugiat! Perspiciatis omnis consequatur mollitia eligendi quibusdam eius explicabo, nemo tempore?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, debitis.
            </Tab>
            <Tab
              label={
                (
                  <span className="flex w-max gap-2">
                    <WarningIcon className="text-error size-6" />
                    Tab 3
                    <WarningIcon className="text-error size-6" />
                  </span>
                )
              }
              value="tab3"
            >
              Content for Tab 3 Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum quas quos iste architecto impedit est non excepturi aperiam recusandae cum!
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium, fugiat! Perspiciatis omnis consequatur mollitia eligendi quibusdam eius explicabo, nemo tempore?
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque ratione molestiae obcaecati quae dolor quis eaque facere voluptas corporis porro.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, dolore. Blanditiis aliquid, architecto dolores cum quisquam necessitatibus similique maiores omnis est,
              fugiat beatae aliquam earum quasi tenetur quidem! Perferendis, voluptates.
            </Tab>
          </Tabs>
        </div>
      </div>
      <Button onClick={() => setActiveTab(activeTab === 'tab1' ? 'tab2' : activeTab === 'tab2' ? 'tab3' : activeTab === 'tab3' ? 'tab1' : 'tab1')}> Change Tab</Button>

    </div>
  );
};

export default TabsPage;
