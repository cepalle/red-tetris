interface IMatch {
  readonly isExact: boolean;
  readonly params: any;
  readonly path: string;
  readonly url: string;
}

export {IMatch};
