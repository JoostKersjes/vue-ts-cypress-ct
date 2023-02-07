# vue-ts-cypress-ct

This branch is showcasing a TypeScript error that happens with [the current Custom Mount Command example for Vue Router](https://docs.cypress.io/guides/component-testing/vue/examples#Vue-Router).

You can see the error in [`HelloWorld.cy.ts`](./src/components/__tests__/HelloWorld.cy.ts).

<details>
<summary>Click to see the full error</summary>

```shell
$ yarn type-check
yarn run v1.22.19
$ vue-tsc --noEmit -p tsconfig.cypress-ct.json --composite false
src/components/__tests__/HelloWorld.cy.ts:5:28 - error TS2322: Type '{ msg: string; }' is not assignable to type 'VNodeProps & { __v_isVNode?: undefined; [Symbol.iterator]?: undefined; } & Record<string, any> & { [x: number]: unknown; } & { readonly length?: number | Prop<unknown, unknown> | null | undefined; ... 19 more ...; toLocaleString?: string | undefined; } & AllowedComponentProps & ComponentCustomProps'.
  Type '{ msg: string; }' is not assignable to type '{ readonly length?: number | Prop<unknown, unknown> | null | undefined; readonly concat?: Prop<unknown, unknown> | { (...items: ConcatArray<string>[]): string[]; (...items: (string | ConcatArray<string>)[]): string[]; } | null | undefined; ... 18 more ...; toLocaleString?: string | undefined; }'.
    Types of property 'toString' are incompatible.
      Type '() => string' is not assignable to type 'string'.

5     cy.mount(HelloWorld, { props: { msg: 'Hello Cypress' } })
                             ~~~~~
```

</details>
