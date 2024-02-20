import { _ as __nuxt_component_0, L as LayoutHeader, a as __nuxt_component_2, b as LayoutContent, c as LayoutFooter } from "./LanguageComponent-BCfin9mq.js";
import { mergeProps, withCtx, createVNode, createTextVNode, toDisplayString, renderSlot, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderSlot } from "vue/server-renderer";
import { _ as _export_sfc } from "../server.mjs";
import "@babel/runtime/helpers/esm/extends";
import "./collapseMotion-HiYDSwVT.js";
import "resize-observer-polyfill";
import "@babel/runtime/helpers/esm/objectSpread2";
import "dom-align";
import "lodash-es/isEqual.js";
import "@emotion/hash";
import "@ant-design/colors";
import "@ctrl/tinycolor";
import "@emotion/unitless";
import "stylis";
import "vue-types";
import "@ant-design/icons-vue/es/icons/LoadingOutlined.js";
import "lodash-es";
import "@ant-design/icons-vue/es/icons/BarsOutlined.js";
import "@ant-design/icons-vue/es/icons/RightOutlined.js";
import "@ant-design/icons-vue/es/icons/LeftOutlined.js";
import "@ant-design/icons-vue/es/icons/EllipsisOutlined.js";
import "lodash-es/uniq.js";
import "#internal/nitro";
import "ofetch";
import "hookable";
import "unctx";
import "h3";
import "unhead";
import "@unhead/shared";
import "vue-router";
import "ufo";
import "defu";
import "klona";
import "devalue";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_a_layout = __nuxt_component_0;
  const _component_a_layout_header = LayoutHeader;
  const _component_LanguagesLanguageComponent = __nuxt_component_2;
  const _component_a_layout_content = LayoutContent;
  const _component_a_layout_footer = LayoutFooter;
  _push(ssrRenderComponent(_component_a_layout, mergeProps({ class: "layout" }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_a_layout_header, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="logo" data-v-4aa73bd4${_scopeId2}></div>`);
              _push3(ssrRenderComponent(_component_LanguagesLanguageComponent, { language: true }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode("div", { class: "logo" }),
                createVNode(_component_LanguagesLanguageComponent, { language: true })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_a_layout_content, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div style="${ssrRenderStyle({ background: "#fff", padding: "24px", minHeight: "100%" })}" data-v-4aa73bd4${_scopeId2}>${ssrInterpolate(_ctx.$config.public.apiBase)} `);
              ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
              _push3(`</div>`);
            } else {
              return [
                createVNode("div", { style: { background: "#fff", padding: "24px", minHeight: "100%" } }, [
                  createTextVNode(toDisplayString(_ctx.$config.public.apiBase) + " ", 1),
                  renderSlot(_ctx.$slots, "default", {}, void 0, true)
                ])
              ];
            }
          }),
          _: 3
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_a_layout_footer, { style: { "text-align": "center" } }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(` Ant Design ©2018 Created by Ant UED `);
            } else {
              return [
                createTextVNode(" Ant Design ©2018 Created by Ant UED ")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_a_layout_header, null, {
            default: withCtx(() => [
              createVNode("div", { class: "logo" }),
              createVNode(_component_LanguagesLanguageComponent, { language: true })
            ]),
            _: 1
          }),
          createVNode(_component_a_layout_content, null, {
            default: withCtx(() => [
              createVNode("div", { style: { background: "#fff", padding: "24px", minHeight: "100%" } }, [
                createTextVNode(toDisplayString(_ctx.$config.public.apiBase) + " ", 1),
                renderSlot(_ctx.$slots, "default", {}, void 0, true)
              ])
            ]),
            _: 3
          }),
          createVNode(_component_a_layout_footer, { style: { "text-align": "center" } }, {
            default: withCtx(() => [
              createTextVNode(" Ant Design ©2018 Created by Ant UED ")
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 3
  }, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/auth.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const auth = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-4aa73bd4"]]);
export {
  auth as default
};
//# sourceMappingURL=auth-67-21dcT.js.map
