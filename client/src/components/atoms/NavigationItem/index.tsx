import React from "react";
import { Navigation } from "@toolpad/core";

interface NavigationItemProps {
  item: Navigation[0] | any;
}

const NavigationItem: React.FC<NavigationItemProps> = ({ item }) => {
  if (item.kind === "header") {
    return <div>{item.title}</div>;
  }
  if (item.kind === "divider") {
    return <hr />;
  }
  return (
    <div>
      {item.icon}
      {item.title}
      {item.children && (
        <ul>
          {item.children.map((child: unknown, index: React.Key | null | undefined) => (
            <li key={index}>
              <NavigationItem item={child} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NavigationItem;
