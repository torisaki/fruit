import React from "react";
import { Collapsible, CollapsibleItem, Icon } from "react-materialize";

export default function About() {
  return (
    <div>
      <Collapsible accordion>
        <CollapsibleItem
          expanded={false}
          header="What is this website?"
          icon={<Icon>live_help</Icon>}
          node="div"
          className="left-align"
        >
          This website allows you to view and purchase fruits.
        </CollapsibleItem>
        <CollapsibleItem
          expanded={false}
          header="Locations"
          icon={<Icon>location_on</Icon>}
          node="div"
          className="left-align"
        >
          We operate globally.
        </CollapsibleItem>
        <CollapsibleItem
          expanded={false}
          header="Are the the fruits safe to consume?"
          icon={<Icon>location_on</Icon>}
          node="div"
          className="left-align"
        >
          The fruits are grown naturally without the use of pesticide.
        </CollapsibleItem>
      </Collapsible>
    </div>
  );
}
