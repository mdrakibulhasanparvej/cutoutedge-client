import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Pending from "./Pending";
import InProgress from "./InProgress";
import QualityControl from "./QualityControl";
import QualityControl2 from "./QualityControl2";
import Finished from "./Finished";

const DesignOnline = () => {
  return (
    <div>
      <Tabs>
        <TabList>
          <Tab>Pending</Tab>
          <Tab>In-Progress</Tab>
          <Tab>Quality Control-1</Tab>
          <Tab>Quality Control-2</Tab>
          <Tab>Finish</Tab>
        </TabList>

        <TabPanel>
          <Pending />
        </TabPanel>
        <TabPanel>
          <InProgress />
        </TabPanel>
        <TabPanel>
          <QualityControl />
        </TabPanel>
        <TabPanel>
          <QualityControl2 />
        </TabPanel>
        <TabPanel>
          <Finished />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default DesignOnline;
