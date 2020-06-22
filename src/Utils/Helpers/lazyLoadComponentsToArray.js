/**
 * @author Dror Golan drorgo@matrix.co.il
 * @param arrayOfElementsToLoad,
          componentsArrayLoaded,
 * @return componentsArrayLoaded
 * @constructor
 */

import React from 'react';
const LazyLoadComponentsToArray = (
  arrayOfElementsToLoad,
  componentsArrayLoaded,
) => {
  arrayOfElementsToLoad.map((element, key) => {
    if (!componentsArrayLoaded[element.component]) {
      let addThisComponents = React.lazy(() =>
        import(`Components/Forms/${element.component}/${element.component}`),
      );
      componentsArrayLoaded[element.component] = addThisComponents;
    }
  });
  return componentsArrayLoaded;
};
export default LazyLoadComponentsToArray;
