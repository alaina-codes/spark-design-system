import React from 'react';
import { configure, addDecorator, addParameters } from '@storybook/react';
import '../../html/_spark.scss';
import '../../storybook-utilities/storybook-theming/_docs.scss';
import { withA11y } from '@storybook/addon-a11y';
import sparkTheme from "../../storybook-utilities/storybook-theming/storybook-spark-theme";
import { withTests } from '@storybook/addon-jest';
import results from '../src/.jest-test-results.json';
import '!style-loader!css-loader!sass-loader!../../storybook-utilities/storybook-theming/font-loader.scss';
import '../../storybook-utilities/icon-loader';
import { DocsContainer } from '@storybook/addon-docs/blocks';
import { SprkTable } from '@sparkdesignsystem/spark-react';

const classModifierJSON = require('../../src/data/sass-modifiers.json');

addDecorator(withA11y);
addDecorator(
  withTests({
    results
  }
));

// Option defaults.
addParameters({
  options: {
    theme: sparkTheme,
    showRoots: true,
    storySort: (a, b) =>
      a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, { numeric: true }),
  },
});

addParameters({
  docs: {
    extractComponentDescription: (component, { info }) => {
      if (info) {
        return typeof info === 'string' ? info : info.markdown || info.text;
      }
      return null;
    },
    container: ({ children, context }) => {
      const componentName = /[^/]*$/.exec(context.kind)[0].toLowerCase();
      const docs = classModifierJSON.filter((item) => { return item.group.indexOf(componentName) !== -1});
      const processDocs = docs.map((item) => { 
        return {
          selector: item.context.name,
          ...item
        }; 
      });
      
      return (
      <DocsContainer context={context}>
        {console.log(`The current component is ${/[^/]*$/.exec(context.kind)[0].toLowerCase()}`)}

        <div>
          {children}
          <h3 className="sprk-u-mbm">Class Modifiers for {/[^/]*$/.exec(context.kind)[0]}</h3>
          <SprkTable
             additionalTableClasses="sprk-b-Table--spacing-medium"
             columns = {[
              {
                name: 'selector',
                header: 'Class'
              },
              {
                name: 'description',
                header: 'Description'
              },
            ]}
            rows = {processDocs}
          />
        </div>
      </DocsContainer>
    )},
  },
})


configure(require.context('../src', true, /\.stories\.(js|ts|tsx|mdx)$/), module);
