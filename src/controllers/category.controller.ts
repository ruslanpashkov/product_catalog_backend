'use strict';

class CategoryController {
  private static instance: CategoryController | null = null;

  // eslint-disable-next-line no-empty-function
  private constructor() {}

  static getInstance() {
    if (!CategoryController.instance) {
      CategoryController.instance = new CategoryController();
    }

    return CategoryController.instance;
  }

}

export const accessoryController = CategoryController.getInstance();
