import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { shallow } from 'enzyme';

// component under test
import VariantCard from "./variant-card";

const CONSTS = {
  errors: {
    missingDesignerError: "Designer Not Available",
    missingPriceError: "Price Not Available",
    missingDescriptionError: "Full Description Not Available",
    missingClassificationError: "Classification Not Available",
    missingColourError: "Colour Not Available",
    missingSeasonError: "Season Not Available",
    missingReplacementColour: "Colour not available",
    missingReplacementTier1: "Category not available",
    missingReplacementTier2: "Product type not available",
    missingReplacementTier3: "Sub-type not available",
  }
};

// snapshot tests
it('renders associated variant correctly', () => {
  const isAssociatedVariant = true;
  const data = {
    classification: {
      classification1: 'c1',
      classification2: 'c2',
      classification3: 'c3'
    },
    designerName: 'harry',
    photo: '',
    price: '£350',
    stock: '50',
    variantId: '44444',
    color: 'red',
    filterColour: "red"
  };

  const createNodeMock = () => {
    // You can return anything from this function.
    // For example:
    return {
        scrollHeight: 430
    }
  };

  const Wrapper = renderer.create(
    <VariantCard
      CONSTS={CONSTS}
      data={data}
      isAssociatedVariant={isAssociatedVariant}
    />, {createNodeMock}
  ).toJSON();

  expect(Wrapper).toMatchSnapshot();
});

it('renders replacement variant correctly', () => {

  const data = {
    classification: {
      classification1: 'c1',
      classification2: 'c2',
      classification3: 'c3'
    },
    designerName: 'harry',
    photo: '',
    price: '£350',
    stock: '50',
    variantId: '44444',
    color: 'red',
    filterColour: "red"
  };

  const createNodeMock = () => {
    // You can return anything from this function.
    // For example:
    return {
      scrollHeight: 430
    }
  };

  const Wrapper = renderer.create(
    <VariantCard
      CONSTS={CONSTS}
      data={data}
    />, {createNodeMock}
  ).toJSON();

  expect(Wrapper).toMatchSnapshot();
});

it('renders variant error correctly', () => {

  const error = 'Invalid Variant';
  const Wrapper = renderer.create(
    <VariantCard
      CONSTS={CONSTS}
      error={error}
    />
  ).toJSON();
  expect(Wrapper).toMatchSnapshot();
});

it('renders with missing text', () => {

  const data = {
    classification: {
      classification1: '',
      classification2: '',
      classification3: ''
    },
    designerName: '',
    photo: '',
    price: '',
    stock: '4',
    variantId: '44444',
    color: 'red',
    filterColour: "red"
  };

  const createNodeMock = () => {
    // You can return anything from this function.
    // For example:
    return {
      scrollHeight: 430
    }
  };

  const Wrapper = renderer.create(
    <VariantCard
      CONSTS={CONSTS}
      data={data}
    />, {createNodeMock}
  ).toJSON();

  expect(Wrapper).toMatchSnapshot();
});

//enzyme tests
it('should render error correctly', () => {

  const data = {
    classification: {
      classification1: 'c1',
      classification2: 'c2',
      classification3: 'c3'
    },
    designerName: 'harry',
    photo: '',
    price: '£350',
    stock: '50',
    variantId: '44444',
    color: 'red',
    red: "yellow",
    filterColour: "yellow"
  };

  const Wrapper = shallow(
    <VariantCard
      CONSTS={CONSTS}
      data={data}
      error={'true'}
    />
  );

  // console.log(Wrapper.debug());
  expect(Wrapper.find('VariantError').exists()).toEqual(true);
  expect(Wrapper.find('VariantIdError').exists()).toEqual(true);

  expect(Wrapper.find('ControlsPosition').childAt(0).name()).toBe('Spacer');
  expect(Wrapper.find('ControlsPosition').childAt(1).name()).toBe('Spacer');
  expect(Wrapper.find('ControlsPosition').childAt(2).name()).toBe('Memo(VariantCardDelete)');
});

it('should render associated variant correctly', () => {
  const data = {
    classification: {
      classification1: 'c1',
      classification2: 'c2',
      classification3: 'c3'
    },
    designerName: 'harry',
    photo: '',
    price: '£350',
    stock: '50',
    variantId: '44444',
    color: 'red',
    filterColour: "red"
  };

  const Wrapper = shallow(
    <VariantCard
      CONSTS={CONSTS}
      data={data}
      isAssociatedVariant={true}
    />
  );

  expect(Wrapper.find('VariantCardDescription').exists()).toEqual(true);
  expect(Wrapper.find('VariantCardDescription').props()).toHaveProperty('rotated', false);
  expect(Wrapper.find('VariantCardImage').exists()).toEqual(true);


  expect(Wrapper.find('ControlsPosition').childAt(0).name()).toBe('VariantCardSliderControl');
  expect(Wrapper.find('ControlsPosition').childAt(1).name()).toBe('VariantCardStock');
  expect(Wrapper.find('ControlsPosition').childAt(2).name()).toBe('Spacer');
});

it('should render recommended variant correctly', () => {
  const data = {
    classification: {
      classification1: 'c1',
      classification2: 'c2',
      classification3: 'c3'
    },
    visibility: [
      {
        name: 'DC1',
        visible: true
      },
      {
        name: 'DC2',
        visible: true
      },
      {
        name: 'DC4'
      }
    ],
    designerName: 'harry',
    photo: '',
    price: '£350',
    stock: '50',
    variantId: '44444',
    color: 'red',
    filterColour: 'red'
  };

  const Wrapper = shallow(
    <VariantCard
      CONSTS={CONSTS}
      data={data}
      isReplacementVariant={true}
    />
  );

  expect(Wrapper.childAt(0).find('VariantCardVisibilitySlide').exists()).toEqual(true);
  expect(Wrapper.childAt(0).find('VariantCardDescription').exists()).toEqual(true);
  expect(Wrapper.find('VariantCardImage').exists()).toEqual(true);

  expect(Wrapper.find('ControlsPosition').childAt(0).name()).toBe('VariantCardSliderControl');
  expect(Wrapper.find('ControlsPosition').childAt(1).name()).toBe('VariantCardStock');
  expect(Wrapper.find('ControlsPosition').childAt(2).name()).toBe('Spacer');
});

it('should render replacement variant correctly', () => {
  const data = {
    classification: {
      classification1: 'c1',
      classification2: 'c2',
      classification3: 'c3'
    },
    visibility: [
      {
        name: 'DC1',
        visible: true
      },
      {
        name: 'DC2',
        visible: true
      },
      {
        name: 'DC4'
      }
    ],
    designerName: 'harry',
    photo: '',
    price: '£350',
    stock: '50',
    variantId: '44444',
    color: 'red',
    filterColour: 'red'
  };

  const Wrapper = shallow(
    <VariantCard
      CONSTS={CONSTS}
      data={data}
    />
  );

  expect(Wrapper.childAt(0).find('VariantCardVisibilitySlide').exists()).toEqual(true);
  expect(Wrapper.find('VariantCardDescription').exists()).toEqual(true);
  expect(Wrapper.find('VariantCardImage').exists()).toEqual(true);

  expect(Wrapper.find('ControlsPosition').childAt(0).name()).toBe('VariantCardSliderControl');
  expect(Wrapper.find('ControlsPosition').childAt(1).name()).toBe('VariantCardStock');
  expect(Wrapper.find('ControlsPosition').childAt(2).name()).toBe('Memo(VariantCardDelete)');
});

it('should render border correctly', () => {
  const data = {
    classification: {
      classification1: 'c1',
      classification2: 'c2',
      classification3: 'c3'
    },
    visibility: [
      {
        name: 'DC1',
        visible: true
      },
      {
        name: 'DC2',
        visible: true
      },
      {
        name: 'DC4'
      }
    ],
    designerName: 'harry',
    photo: '',
    price: '£350',
    stock: '50',
    variantId: '44444',
    color: 'red',
    filterColour: 'red'
  };

  const Wrapper = shallow(
    <VariantCard
      CONSTS={CONSTS}
      data={data}
      wasAdded={true}
    />
  );

  expect(Wrapper.childAt(0).find('VariantCardVisibilitySlide').exists()).toEqual(true);
  expect(Wrapper.find('VariantCardDescription').exists()).toEqual(true);
  expect(Wrapper.find('VariantCardImage').exists()).toEqual(true);

  expect(Wrapper.find('ControlsPosition').childAt(0).name()).toBe('VariantCardSliderControl');
  expect(Wrapper.find('ControlsPosition').childAt(1).name()).toBe('VariantCardStock');
  expect(Wrapper.find('ControlsPosition').childAt(2).name()).toBe('Memo(VariantCardDelete)');

  expect(Wrapper.find('FadedBorder').exists()).toEqual(true);
});

it('should render manually added indicator correctly', () => {
  const data = {
    classification: {
      classification1: 'c1',
      classification2: 'c2',
      classification3: 'c3'
    },
    designerName: 'harry',
    photo: '',
    price: '£350',
    stock: '50',
    variantId: '44444',
    color: 'red',
    indicateAsManuallyAdded: true
  };

  const Wrapper = shallow(
    <VariantCard
      CONSTS={CONSTS}
      data={data}
      wasAdded={true}
    />
  );

  expect(Wrapper.find('ManuallyAddedIndicator').exists()).toEqual(true);
});

it('should not render manually added indicator', () => {
  const data = {
    classification: {
      classification1: 'c1',
      classification2: 'c2',
      classification3: 'c3'
    },
    designerName: 'harry',
    photo: '',
    price: '£350',
    stock: '50',
    variantId: '44444',
    color: 'red',
    indicateAsManuallyAdded: false
  };

  const Wrapper = shallow(
    <VariantCard
      CONSTS={CONSTS}
      data={data}
      wasAdded={true}
    />
  );

  expect(Wrapper.find('ManuallyAddedIndicator').exists()).toEqual(false);
});



