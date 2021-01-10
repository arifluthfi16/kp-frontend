import React from 'react';
import "./breadcrumb.css";
import {Link} from 'react-router-dom';
import {Breadcrumb, BreadcrumbItem} from "bima-design/lib/components";

const BreadcrumbWrapper = (props) =>{
  const crumbList = props.data ? props.data : [];

  const conditionallyPrintBreadcrumbItems = () => {
    if(crumbList){
      return crumbList.map((item)=>{
        return (
          <BreadcrumbItem href={item.link}>
            {item.name}
          </BreadcrumbItem>
        )
      })
    }else{
      return null;
    }
  }

  return (
      <div className={"content-breadcrumb"}>
          <Breadcrumb>
              <BreadcrumbItem href="/">Home</BreadcrumbItem>
              {conditionallyPrintBreadcrumbItems()}
          </Breadcrumb>
      </div>
  )
}

export default BreadcrumbWrapper;
