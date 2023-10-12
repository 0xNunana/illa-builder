import i18n from "@/i18n/config"
import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import { DATA_GRID_COMMUNITY_EVENT_HANDLER_CONFIG } from "@/widgetLibrary/DataGridCommunityWidget"
import { generatorEventHandlerConfig } from "@/widgetLibrary/PublicSector/utils/generatorEventHandlerConfig"

const baseWidgetName = "dataGridPremium"
export const DATA_GRID_PREMIUM_PANEL_CONFIG: PanelConfig[] = [
  {
    id: `${baseWidgetName}-data`,
    groupName: i18n.t("editor.inspect.setter_group.data"),
    children: [
      {
        id: `${baseWidgetName}-data-source`,
        labelName: i18n.t("editor.inspect.setter_label.data_source"),
        useCustomLayout: true,
        attrName: "dataSource",
        setterType: "DATA_SOURCE_SELECT_SETTER",
      },
      {
        id: `${baseWidgetName}-basic-loading`,
        labelName: i18n.t("editor.inspect.setter_label.loading"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.loading"),
        attrName: "loading",
        setterType: "DYNAMIC_SWITCH_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
        openDynamic: true,
        useCustomLayout: true,
      },
      {
        id: `${baseWidgetName}-basic-primaryKey`,
        labelName: i18n.t("editor.inspect.setter_label.primary_key"),
        labelDesc: i18n.t("editor.inspect.setter_tips.primary_key"),
        attrName: "primaryKey",
        setterType: "DATA_GRID_COLUMNS_SELECT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
        openDynamic: true,
      },
    ],
  },
  {
    id: `${baseWidgetName}-sort`,
    groupName: i18n.t("editor.inspect.setter_group.sort"),
    children: [
      {
        id: `${baseWidgetName}-basic-sortKey`,
        labelName: i18n.t("editor.inspect.setter_label.default_sort_key"),
        attrName: "sortKey",
        setterType: "DATA_GRID_COLUMNS_SELECT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
        openDynamic: true,
      },
      {
        id: `${baseWidgetName}-basic-sortOrder`,
        labelName: i18n.t("editor.inspect.setter_label.default_sort_order"),
        attrName: "sortOrder",
        setterType: "RADIO_GROUP_SETTER",
        isSetterSingleRow: true,
        bindAttrName: ["sortKey"],
        shown: (value) => value !== "default",
        options: [
          { label: i18n.t("widget.table.ascend"), value: "asc" },
          { label: i18n.t("widget.table.descend"), value: "desc" },
          { label: i18n.t("widget.table.default"), value: "default" },
        ],
      },
    ],
  },
  {
    id: `${baseWidgetName}-rowSelection`,
    groupName: i18n.t("editor.inspect.setter_group.row_selection"),
    children: [
      {
        id: `${baseWidgetName}-basic-multiRowSelection`,
        labelName: i18n.t("editor.inspect.setter_label.multi_row_selection"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.multi_row_selection"),
        attrName: "multiRowSelection",
        setterType: "DYNAMIC_SWITCH_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
        openDynamic: true,
        useCustomLayout: true,
      },
    ],
  },
  {
    id: `${baseWidgetName}-PAGINATION`,
    groupName: i18n.t("editor.inspect.setter_group.pagination"),
    children: [
      {
        id: `${baseWidgetName}-basic-overFlow`,
        labelName: i18n.t("editor.inspect.setter_label.overFlow"),
        attrName: "overFlow",
        setterType: "RADIO_GROUP_SETTER",
        options: [
          { label: i18n.t("widget.table.pagination"), value: "pagination" },
          { label: i18n.t("widget.table.scroll"), value: "scroll" },
        ],
      },
      {
        id: `${baseWidgetName}-basic-enableServerSidePagination`,
        labelName: i18n.t(
          "editor.inspect.setter_label.table.enable_server_side_p",
        ),
        labelDesc: i18n.t(
          "editor.inspect.setter_tips.table.enable_server_side_p",
        ),
        attrName: "enableServerSidePagination",
        setterType: "DYNAMIC_SWITCH_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
        openDynamic: true,
        useCustomLayout: true,
      },
      {
        id: `${baseWidgetName}-column-paginationType`,
        labelName: i18n.t("editor.inspect.setter_label.table.pagination_type"),
        labelDesc: i18n.t("editor.inspect.setter_tips.table.pagination_type"),
        attrName: "paginationType",
        setterType: "SEARCH_SELECT_SETTER",
        isSetterSingleRow: true,
        bindAttrName: ["enableServerSidePagination"],
        shown: (value) => value,
        options: [
          {
            label: i18n.t(
              "editor.inspect.setter_option.table.limit_offset_based",
            ),
            value: "limitOffsetBased",
          },
          {
            label: i18n.t("editor.inspect.setter_option.table.cursor_based"),
            value: "cursorBased",
          },
        ],
      },
      {
        id: `${baseWidgetName}-basic-totalRowCount`,
        labelName: i18n.t("editor.inspect.setter_label.table.total_row_count"),
        attrName: "totalRowCount",
        setterType: "INPUT_SETTER",
        isSetterSingleRow: true,
        expectedType: VALIDATION_TYPES.NUMBER,
        bindAttrName: ["enableServerSidePagination"],
        shown: (value) => value,
      },
      {
        id: `${baseWidgetName}-basic-previousCursor`,
        labelName: i18n.t("editor.inspect.setter_label.previous_cursor"),
        attrName: "previousCursor",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
        bindAttrName: ["enableServerSidePagination", "paginationType"],
        shown: (enable, paginationType) =>
          enable && paginationType === "cursorBased",
      },
      {
        id: `${baseWidgetName}-basic-nextCursor`,
        labelName: i18n.t("editor.inspect.setter_label.table.next_cursor"),
        attrName: "nextCursor",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
        bindAttrName: ["enableServerSidePagination", "paginationType"],
        shown: (enable, paginationType) =>
          enable && paginationType === "cursorBased",
      },
      {
        id: `${baseWidgetName}-basic-hasNextPage`,
        labelName: i18n.t("editor.inspect.setter_label.table.has_next_page"),
        attrName: "hasNextPage",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
        bindAttrName: ["enableServerSidePagination", "paginationType"],
        shown: (enable, paginationType) =>
          enable && paginationType === "cursorBased",
      },
      {
        id: `${baseWidgetName}-basic-pageSize`,
        labelName: i18n.t("editor.inspect.setter_label.pageSize"),
        placeholder: "{{30}}",
        attrName: "pageSize",
        setterType: "INPUT_SETTER",
        bindAttrName: [
          "overFlow",
          "enableServerSidePagination",
          "paginationType",
        ],
        shown: (overFlow) => overFlow === "pagination",
        expectedType: VALIDATION_TYPES.NUMBER,
      },
      {
        id: `${baseWidgetName}-basic-page`,
        labelName: i18n.t("editor.inspect.setter_label.page"),
        placeholder: "{{0}}",
        attrName: "page",
        setterType: "INPUT_SETTER",
        bindAttrName: [
          "overFlow",
          "enableServerSidePagination",
          "paginationType",
        ],
        shown: (overFlow, enableServerSidePagination, paginationType) =>
          overFlow === "pagination" &&
          (enableServerSidePagination
            ? paginationType === "limitOffsetBased"
            : true),
        expectedType: VALIDATION_TYPES.NUMBER,
      },
      {
        id: `${baseWidgetName}-basic-pageSizeOptions`,
        labelName: i18n.t("editor.inspect.setter_label.page_size_options"),
        placeholder: "{{[5, 10, 25]}}",
        attrName: "pageSizeOptions",
        setterType: "INPUT_SETTER",
        bindAttrName: ["overFlow"],
        shown: (overFlow) => overFlow === "pagination",
        isSetterSingleRow: true,
        expectedType: VALIDATION_TYPES.ARRAY,
      },
    ],
  },
  {
    id: `${baseWidgetName}-toolbar`,
    groupName: i18n.t("editor.inspect.setter_group.toolbar"),
    children: [
      {
        id: `${baseWidgetName}-basic-densitySetting`,
        labelName: i18n.t("editor.inspect.setter_content.density_setting"),
        labelDesc: i18n.t("editor.inspect.setter_tips.table.density_setting"),
        attrName: "densitySetting",
        setterType: "DYNAMIC_SWITCH_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
        openDynamic: true,
        useCustomLayout: true,
      },
      {
        id: `${baseWidgetName}-basic-columnSetting`,
        labelName: i18n.t("editor.inspect.setter_content.column_setting"),
        labelDesc: i18n.t("editor.inspect.setter_tips.table.column_setting"),
        attrName: "columnSetting",
        setterType: "DYNAMIC_SWITCH_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
        openDynamic: true,
        useCustomLayout: true,
      },
      {
        id: `${baseWidgetName}-basic-refreshSetting`,
        labelName: i18n.t("editor.inspect.setter_content.refresh_setting"),
        labelDesc: i18n.t("editor.inspect.setter_tips.table.refresh_setting"),
        attrName: "refreshSetting",
        setterType: "DYNAMIC_SWITCH_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
        openDynamic: true,
        useCustomLayout: true,
      },
      {
        id: `${baseWidgetName}-basic-exportSetting`,
        labelName: i18n.t("editor.inspect.setter_label.export_setting"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.export_setting"),
        attrName: "exportSetting",
        setterType: "DYNAMIC_SWITCH_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
        openDynamic: true,
        useCustomLayout: true,
      },
      {
        id: `${baseWidgetName}-basic-exportAllSetting`,
        labelName: i18n.t(
          "editor.inspect.setter_label.table.export_all_data_setting",
        ),
        labelDesc: i18n.t(
          "editor.inspect.setter_tips.table.export_all_data_setting",
        ),
        attrName: "exportAllSetting",
        setterType: "DYNAMIC_SWITCH_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
        openDynamic: true,
        useCustomLayout: true,
      },
      {
        id: `${baseWidgetName}-basic-filterSetting`,
        labelName: i18n.t("editor.inspect.setter_label.filter_setting"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.filter_setting"),
        attrName: "filterSetting",
        setterType: "DYNAMIC_SWITCH_SETTER",
        expectedType: VALIDATION_TYPES.BOOLEAN,
        openDynamic: true,
        useCustomLayout: true,
      },
    ],
  },
  {
    id: `${baseWidgetName}-interaction`,
    groupName: i18n.t("editor.inspect.setter_group.interaction"),
    children: [
      {
        ...generatorEventHandlerConfig(
          baseWidgetName,
          DATA_GRID_COMMUNITY_EVENT_HANDLER_CONFIG.events,
        ),
      },
    ],
  },
]
