export class Filter {
  category?: string;
  search?: string;
  related: boolean = false;

  rest() {
    this.category = this.search = null;
    this.related = false;
  }
}
