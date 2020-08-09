import React from 'react';
import { ListSubheader, useMediaQuery, useTheme } from '@material-ui/core';
import { VariableSizeList } from 'react-window';

const LISTBOX_PADDING = 8; // px

function useResetCache(data) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true);
    }
  }, [data]);
  return ref;
}

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef((props, ref) => {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

function renderRow(props) {
  const { data, index, style } = props;
  return React.cloneElement(data[index], {
    style: {
      ...style,
      top: style.top + LISTBOX_PADDING,
    },
  });
}

const InnerElementType = ({ children }) => {
  return <ul style={{ width: 'unset' }}>{children}</ul>;
};

export const VirtualizedListboxComponent = React.forwardRef(
  function ListboxComponent(props, ref) {
    const { children, ...other } = props;
    const itemData = React.Children.toArray(children);
    const theme = useTheme();
    const smUp = useMediaQuery(theme.breakpoints.up('sm'), { noSsr: true });
    const itemCount = itemData.length;
    const itemSize = smUp ? 36 : 48;

    const getHeight = () => {
      if (itemCount > 8) {
        return 8 * itemSize;
      }
      return itemData.map(itemSize).reduce((a, b) => a + b, 0);
    };

    const gridRef = useResetCache(itemCount);

    return (
      <div ref={ref}>
        <OuterElementContext.Provider value={other}>
          <VariableSizeList
            itemData={itemData}
            height={getHeight() + 2 * LISTBOX_PADDING}
            width='100%'
            ref={gridRef}
            outerElementType={OuterElementType}
            innerElementType={InnerElementType}
            itemSize={() => itemSize}
            overscanCount={5}
            itemCount={itemCount}>
            {renderRow}
          </VariableSizeList>
        </OuterElementContext.Provider>
      </div>
    );
  },
);
