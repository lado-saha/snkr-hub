
export class Category {
  constructor({
    id,
    name,
    isActive = true,
    parentId = 2,
    level = 2,
    includeInMenu = true,
    // urlKey,
  }) {
    this.id = id;
    this.name = name;
    this.isActive = isActive;
    this.parentId = parentId;
    this.level = level;
    this.includeInMenu = includeInMenu;
    // this.urlKey = urlKey;
  }

  static CategoryAll = new Category(0, "All")

  static fromJSON(json) {

    return new Category({
      id: json.id,
      name: json.name,
      isActive: json.is_active,
      parentId: json.parent_id,
      level: json.level,
      includeInMenu: json.include_in_menu,
    });
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      is_active: this.isActive,
      parent_id: this.parentId,
      level: this.level,
      include_in_menu: this.includeInMenu,

    };
  }
}

