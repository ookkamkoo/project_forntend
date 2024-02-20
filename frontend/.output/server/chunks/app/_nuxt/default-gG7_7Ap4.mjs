import { createVNode, defineComponent, shallowRef, computed, watch, nextTick, ref, watchEffect, Fragment, onUnmounted, Transition, withDirectives, vShow, inject, provide, useSSRContext, mergeProps, withCtx, openBlock, createBlock, createTextVNode, renderSlot, resolveComponent, unref, resolveDynamicComponent, toDisplayString, createCommentVNode, renderList } from 'vue';
import { ssrRenderComponent, ssrRenderSlot, ssrRenderList, ssrRenderVNode, ssrInterpolate } from 'vue/server-renderer';
import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons-vue';
import { i as isNumeric, K as KeyCode$1, _ as __nuxt_component_0, d as LayoutSider, L as LayoutHeader, b as LayoutContent, M as Menu, e as __nuxt_component_1, f as __nuxt_component_2$1, a as __nuxt_component_2 } from './LanguageComponent-BCfin9mq.mjs';
import { _ as _export_sfc } from '../server.mjs';
import _objectSpread$1 from '@babel/runtime/helpers/esm/objectSpread2';
import { A as AntdIcon, u as useConfigInject, V as getPropsSlot, R as ResizeObserver, i as initDefaultProps, W as tooltipDefaultProps, p as warning$1, c as classNames, T as Tooltip, o as omit, X as getTransitionName, Y as withInstall, k as flattenChildren, l as cloneElement, Z as isPresetColor, _ as isPresetStatusColor, $ as Wave, a0 as Portal, a1 as devWarning, b as getTransitionProps, N as NoCompactStyle, a2 as useConfigContextInject, r as genComponentStyleHook, P as PropTypes, a3 as abstractTooltipProps, n as anyType, f as filterEmpty, D as eventType, v as objectType, y as stringType, x as booleanType, s as someType, C as arrayType, z as functionType, J as merge, a4 as initZoomMotion, Q as resetComponent, a5 as getArrowStyle, a6 as PresetColors, a7 as capitalize, a8 as genPresetColor, B as Button } from './collapseMotion-HiYDSwVT.mjs';
import _extends from '@babel/runtime/helpers/esm/extends';
import { u as useResponsiveObserver, r as responsiveArray } from './responsiveObserve-B4dkFnFr.mjs';
import 'lodash-es/uniq.js';
import '@ctrl/tinycolor';
import '../../nitro/node-server.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'resize-observer-polyfill';
import 'dom-align';
import 'lodash-es/isEqual.js';
import '@ant-design/colors';
import 'stylis';
import 'vue-types';
import 'lodash-es';

// This icon file is generated automatically.
var CloseOutlined$2 = { "icon": { "tag": "svg", "attrs": { "fill-rule": "evenodd", "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z" } }] }, "name": "close", "theme": "outlined" };
const CloseOutlinedSvg = CloseOutlined$2;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CloseOutlined = function CloseOutlined(props, context) {
  var p = _objectSpread({}, props, context.attrs);

  return createVNode(AntdIcon, _objectSpread({}, p, {
    "icon": CloseOutlinedSvg
  }), null);
};

CloseOutlined.displayName = 'CloseOutlined';
CloseOutlined.inheritAttrs = false;
const CloseOutlined$1 = CloseOutlined;

function useBreakpoint() {
  const screens = shallowRef({});
  let token = null;
  const responsiveObserve = useResponsiveObserver();
  onUnmounted(() => {
    responsiveObserve.value.unsubscribe(token);
  });
  return screens;
}
function eagerComputed(fn) {
  const result = shallowRef();
  watchEffect(() => {
    result.value = fn();
  }, {
    flush: "sync"
    // needed so updates are immediate.
  });
  return result;
}
const genBaseStyle$2 = (token) => {
  const {
    antCls,
    componentCls,
    iconCls,
    avatarBg,
    avatarColor,
    containerSize,
    containerSizeLG,
    containerSizeSM,
    textFontSize,
    textFontSizeLG,
    textFontSizeSM,
    borderRadius,
    borderRadiusLG,
    borderRadiusSM,
    lineWidth,
    lineType
  } = token;
  const avatarSizeStyle = (size, fontSize, radius) => ({
    width: size,
    height: size,
    lineHeight: `${size - lineWidth * 2}px`,
    borderRadius: "50%",
    [`&${componentCls}-square`]: {
      borderRadius: radius
    },
    [`${componentCls}-string`]: {
      position: "absolute",
      left: {
        _skip_check_: true,
        value: "50%"
      },
      transformOrigin: "0 center"
    },
    [`&${componentCls}-icon`]: {
      fontSize,
      [`> ${iconCls}`]: {
        margin: 0
      }
    }
  });
  return {
    [componentCls]: _extends(_extends(_extends(_extends({}, resetComponent(token)), {
      position: "relative",
      display: "inline-block",
      overflow: "hidden",
      color: avatarColor,
      whiteSpace: "nowrap",
      textAlign: "center",
      verticalAlign: "middle",
      background: avatarBg,
      border: `${lineWidth}px ${lineType} transparent`,
      [`&-image`]: {
        background: "transparent"
      },
      [`${antCls}-image-img`]: {
        display: "block"
      }
    }), avatarSizeStyle(containerSize, textFontSize, borderRadius)), {
      [`&-lg`]: _extends({}, avatarSizeStyle(containerSizeLG, textFontSizeLG, borderRadiusLG)),
      [`&-sm`]: _extends({}, avatarSizeStyle(containerSizeSM, textFontSizeSM, borderRadiusSM)),
      "> img": {
        display: "block",
        width: "100%",
        height: "100%",
        objectFit: "cover"
      }
    })
  };
};
const genGroupStyle = (token) => {
  const {
    componentCls,
    groupBorderColor,
    groupOverlapping,
    groupSpace
  } = token;
  return {
    [`${componentCls}-group`]: {
      display: "inline-flex",
      [`${componentCls}`]: {
        borderColor: groupBorderColor
      },
      [`> *:not(:first-child)`]: {
        marginInlineStart: groupOverlapping
      }
    },
    [`${componentCls}-group-popover`]: {
      [`${componentCls} + ${componentCls}`]: {
        marginInlineStart: groupSpace
      }
    }
  };
};
const useStyle$4 = genComponentStyleHook("Avatar", (token) => {
  const {
    colorTextLightSolid,
    colorTextPlaceholder
  } = token;
  const avatarToken = merge(token, {
    avatarBg: colorTextPlaceholder,
    avatarColor: colorTextLightSolid
  });
  return [genBaseStyle$2(avatarToken), genGroupStyle(avatarToken)];
}, (token) => {
  const {
    controlHeight,
    controlHeightLG,
    controlHeightSM,
    fontSize,
    fontSizeLG,
    fontSizeXL,
    fontSizeHeading3,
    marginXS,
    marginXXS,
    colorBorderBg
  } = token;
  return {
    containerSize: controlHeight,
    containerSizeLG: controlHeightLG,
    containerSizeSM: controlHeightSM,
    textFontSize: Math.round((fontSizeLG + fontSizeXL) / 2),
    textFontSizeLG: fontSizeHeading3,
    textFontSizeSM: fontSize,
    groupSpace: marginXXS,
    groupOverlapping: -marginXS,
    groupBorderColor: colorBorderBg
  };
});
const AvatarContextKey = Symbol("AvatarContextKey");
const useAvatarInjectContext = () => {
  return inject(AvatarContextKey, {});
};
const useAvatarProviderContext = (context) => {
  return provide(AvatarContextKey, context);
};
const avatarProps = () => ({
  prefixCls: String,
  shape: {
    type: String,
    default: "circle"
  },
  size: {
    type: [Number, String, Object],
    default: () => "default"
  },
  src: String,
  /** Srcset of image avatar */
  srcset: String,
  icon: PropTypes.any,
  alt: String,
  gap: Number,
  draggable: {
    type: Boolean,
    default: void 0
  },
  crossOrigin: String,
  loadError: {
    type: Function
  }
});
const Avatar = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "AAvatar",
  inheritAttrs: false,
  props: avatarProps(),
  slots: Object,
  setup(props2, _ref) {
    let {
      slots,
      attrs
    } = _ref;
    const isImgExist = shallowRef(true);
    const isMounted = shallowRef(false);
    const scale = shallowRef(1);
    const avatarChildrenRef = shallowRef(null);
    const avatarNodeRef = shallowRef(null);
    const {
      prefixCls
    } = useConfigInject("avatar", props2);
    const [wrapSSR, hashId] = useStyle$4(prefixCls);
    const avatarCtx = useAvatarInjectContext();
    const size = computed(() => {
      return props2.size === "default" ? avatarCtx.size : props2.size;
    });
    const screens = useBreakpoint();
    const responsiveSize = eagerComputed(() => {
      if (typeof props2.size !== "object") {
        return void 0;
      }
      const currentBreakpoint = responsiveArray.find((screen) => screens.value[screen]);
      const currentSize = props2.size[currentBreakpoint];
      return currentSize;
    });
    const responsiveSizeStyle = (hasIcon) => {
      if (responsiveSize.value) {
        return {
          width: `${responsiveSize.value}px`,
          height: `${responsiveSize.value}px`,
          lineHeight: `${responsiveSize.value}px`,
          fontSize: `${hasIcon ? responsiveSize.value / 2 : 18}px`
        };
      }
      return {};
    };
    const setScaleParam = () => {
      if (!avatarChildrenRef.value || !avatarNodeRef.value) {
        return;
      }
      const childrenWidth = avatarChildrenRef.value.offsetWidth;
      const nodeWidth = avatarNodeRef.value.offsetWidth;
      if (childrenWidth !== 0 && nodeWidth !== 0) {
        const {
          gap = 4
        } = props2;
        if (gap * 2 < nodeWidth) {
          scale.value = nodeWidth - gap * 2 < childrenWidth ? (nodeWidth - gap * 2) / childrenWidth : 1;
        }
      }
    };
    const handleImgLoadError = () => {
      const {
        loadError
      } = props2;
      const errorFlag = loadError === null || loadError === void 0 ? void 0 : loadError();
      if (errorFlag !== false) {
        isImgExist.value = false;
      }
    };
    watch(() => props2.src, () => {
      nextTick(() => {
        isImgExist.value = true;
        scale.value = 1;
      });
    });
    watch(() => props2.gap, () => {
      nextTick(() => {
        setScaleParam();
      });
    });
    return () => {
      var _a, _b;
      const {
        shape,
        src,
        alt,
        srcset,
        draggable,
        crossOrigin
      } = props2;
      const mergeShape = (_a = avatarCtx.shape) !== null && _a !== void 0 ? _a : shape;
      const icon = getPropsSlot(slots, props2, "icon");
      const pre = prefixCls.value;
      const classString = {
        [`${attrs.class}`]: !!attrs.class,
        [pre]: true,
        [`${pre}-lg`]: size.value === "large",
        [`${pre}-sm`]: size.value === "small",
        [`${pre}-${mergeShape}`]: true,
        [`${pre}-image`]: src && isImgExist.value,
        [`${pre}-icon`]: icon,
        [hashId.value]: true
      };
      const sizeStyle = typeof size.value === "number" ? {
        width: `${size.value}px`,
        height: `${size.value}px`,
        lineHeight: `${size.value}px`,
        fontSize: icon ? `${size.value / 2}px` : "18px"
      } : {};
      const children = (_b = slots.default) === null || _b === void 0 ? void 0 : _b.call(slots);
      let childrenToRender;
      if (src && isImgExist.value) {
        childrenToRender = createVNode("img", {
          "draggable": draggable,
          "src": src,
          "srcset": srcset,
          "onError": handleImgLoadError,
          "alt": alt,
          "crossorigin": crossOrigin
        }, null);
      } else if (icon) {
        childrenToRender = icon;
      } else if (isMounted.value || scale.value !== 1) {
        const transformString = `scale(${scale.value}) translateX(-50%)`;
        const childrenStyle = {
          msTransform: transformString,
          WebkitTransform: transformString,
          transform: transformString
        };
        const sizeChildrenStyle = typeof size.value === "number" ? {
          lineHeight: `${size.value}px`
        } : {};
        childrenToRender = createVNode(ResizeObserver, {
          "onResize": setScaleParam
        }, {
          default: () => [createVNode("span", {
            "class": `${pre}-string`,
            "ref": avatarChildrenRef,
            "style": _extends(_extends({}, sizeChildrenStyle), childrenStyle)
          }, [children])]
        });
      } else {
        childrenToRender = createVNode("span", {
          "class": `${pre}-string`,
          "ref": avatarChildrenRef,
          "style": {
            opacity: 0
          }
        }, [children]);
      }
      return wrapSSR(createVNode("span", _objectSpread$1(_objectSpread$1({}, attrs), {}, {
        "ref": avatarNodeRef,
        "class": classString,
        "style": [sizeStyle, responsiveSizeStyle(!!icon), attrs.style]
      }), [childrenToRender]));
    };
  }
});
const Avatar$1 = Avatar;
const genBaseStyle$1 = (token) => {
  const {
    componentCls,
    popoverBg,
    popoverColor,
    width,
    fontWeightStrong,
    popoverPadding,
    boxShadowSecondary,
    colorTextHeading,
    borderRadiusLG: borderRadius,
    zIndexPopup,
    marginXS,
    colorBgElevated
  } = token;
  return [
    {
      [componentCls]: _extends(_extends({}, resetComponent(token)), {
        position: "absolute",
        top: 0,
        // use `left` to fix https://github.com/ant-design/ant-design/issues/39195
        left: {
          _skip_check_: true,
          value: 0
        },
        zIndex: zIndexPopup,
        fontWeight: "normal",
        whiteSpace: "normal",
        textAlign: "start",
        cursor: "auto",
        userSelect: "text",
        "--antd-arrow-background-color": colorBgElevated,
        "&-rtl": {
          direction: "rtl"
        },
        "&-hidden": {
          display: "none"
        },
        [`${componentCls}-content`]: {
          position: "relative"
        },
        [`${componentCls}-inner`]: {
          backgroundColor: popoverBg,
          backgroundClip: "padding-box",
          borderRadius,
          boxShadow: boxShadowSecondary,
          padding: popoverPadding
        },
        [`${componentCls}-title`]: {
          minWidth: width,
          marginBottom: marginXS,
          color: colorTextHeading,
          fontWeight: fontWeightStrong
        },
        [`${componentCls}-inner-content`]: {
          color: popoverColor
        }
      })
    },
    // Arrow Style
    getArrowStyle(token, {
      colorBg: "var(--antd-arrow-background-color)"
    }),
    // Pure Render
    {
      [`${componentCls}-pure`]: {
        position: "relative",
        maxWidth: "none",
        [`${componentCls}-content`]: {
          display: "inline-block"
        }
      }
    }
  ];
};
const genColorStyle = (token) => {
  const {
    componentCls
  } = token;
  return {
    [componentCls]: PresetColors.map((colorKey) => {
      const lightColor = token[`${colorKey}-6`];
      return {
        [`&${componentCls}-${colorKey}`]: {
          "--antd-arrow-background-color": lightColor,
          [`${componentCls}-inner`]: {
            backgroundColor: lightColor
          },
          [`${componentCls}-arrow`]: {
            background: "transparent"
          }
        }
      };
    })
  };
};
const genWireframeStyle = (token) => {
  const {
    componentCls,
    lineWidth,
    lineType,
    colorSplit,
    paddingSM,
    controlHeight,
    fontSize,
    lineHeight,
    padding
  } = token;
  const titlePaddingBlockDist = controlHeight - Math.round(fontSize * lineHeight);
  const popoverTitlePaddingBlockTop = titlePaddingBlockDist / 2;
  const popoverTitlePaddingBlockBottom = titlePaddingBlockDist / 2 - lineWidth;
  const popoverPaddingHorizontal = padding;
  return {
    [componentCls]: {
      [`${componentCls}-inner`]: {
        padding: 0
      },
      [`${componentCls}-title`]: {
        margin: 0,
        padding: `${popoverTitlePaddingBlockTop}px ${popoverPaddingHorizontal}px ${popoverTitlePaddingBlockBottom}px`,
        borderBottom: `${lineWidth}px ${lineType} ${colorSplit}`
      },
      [`${componentCls}-inner-content`]: {
        padding: `${paddingSM}px ${popoverPaddingHorizontal}px`
      }
    }
  };
};
const useStyle$3 = genComponentStyleHook("Popover", (token) => {
  const {
    colorBgElevated,
    colorText,
    wireframe
  } = token;
  const popoverToken = merge(token, {
    popoverBg: colorBgElevated,
    popoverColor: colorText,
    popoverPadding: 12
    // Fixed Value
  });
  return [genBaseStyle$1(popoverToken), genColorStyle(popoverToken), wireframe && genWireframeStyle(popoverToken), initZoomMotion(popoverToken, "zoom-big")];
}, (_ref) => {
  let {
    zIndexPopupBase
  } = _ref;
  return {
    zIndexPopup: zIndexPopupBase + 30,
    width: 177
  };
});
const popoverProps = () => _extends(_extends({}, abstractTooltipProps()), {
  content: anyType(),
  title: anyType()
});
const Popover = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "APopover",
  inheritAttrs: false,
  props: initDefaultProps(popoverProps(), _extends(_extends({}, tooltipDefaultProps()), {
    trigger: "hover",
    placement: "top",
    mouseEnterDelay: 0.1,
    mouseLeaveDelay: 0.1
  })),
  setup(props2, _ref) {
    let {
      expose,
      slots,
      attrs
    } = _ref;
    const tooltipRef = ref();
    warning$1(props2.visible === void 0);
    expose({
      getPopupDomNode: () => {
        var _a, _b;
        return (_b = (_a = tooltipRef.value) === null || _a === void 0 ? void 0 : _a.getPopupDomNode) === null || _b === void 0 ? void 0 : _b.call(_a);
      }
    });
    const {
      prefixCls,
      configProvider
    } = useConfigInject("popover", props2);
    const [wrapSSR, hashId] = useStyle$3(prefixCls);
    const rootPrefixCls = computed(() => configProvider.getPrefixCls());
    const getOverlay = () => {
      var _a, _b;
      const {
        title = filterEmpty((_a = slots.title) === null || _a === void 0 ? void 0 : _a.call(slots)),
        content = filterEmpty((_b = slots.content) === null || _b === void 0 ? void 0 : _b.call(slots))
      } = props2;
      const hasTitle = !!(Array.isArray(title) ? title.length : title);
      const hasContent = !!(Array.isArray(content) ? content.length : title);
      if (!hasTitle && !hasContent)
        return null;
      return createVNode(Fragment, null, [hasTitle && createVNode("div", {
        "class": `${prefixCls.value}-title`
      }, [title]), createVNode("div", {
        "class": `${prefixCls.value}-inner-content`
      }, [content])]);
    };
    return () => {
      const overlayCls = classNames(props2.overlayClassName, hashId.value);
      return wrapSSR(createVNode(Tooltip, _objectSpread$1(_objectSpread$1(_objectSpread$1({}, omit(props2, ["title", "content"])), attrs), {}, {
        "prefixCls": prefixCls.value,
        "ref": tooltipRef,
        "overlayClassName": overlayCls,
        "transitionName": getTransitionName(rootPrefixCls.value, "zoom-big", props2.transitionName),
        "data-popover-inject": true
      }), {
        title: getOverlay,
        default: slots.default
      }));
    };
  }
});
const Popover$1 = withInstall(Popover);
const groupProps = () => ({
  prefixCls: String,
  maxCount: Number,
  maxStyle: {
    type: Object,
    default: void 0
  },
  maxPopoverPlacement: {
    type: String,
    default: "top"
  },
  maxPopoverTrigger: String,
  /*
   * Size of avatar, options: `large`, `small`, `default`
   * or a custom number size
   * */
  size: {
    type: [Number, String, Object],
    default: "default"
  },
  shape: {
    type: String,
    default: "circle"
  }
});
const Group = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "AAvatarGroup",
  inheritAttrs: false,
  props: groupProps(),
  setup(props2, _ref) {
    let {
      slots,
      attrs
    } = _ref;
    const {
      prefixCls,
      direction
    } = useConfigInject("avatar", props2);
    const groupPrefixCls = computed(() => `${prefixCls.value}-group`);
    const [wrapSSR, hashId] = useStyle$4(prefixCls);
    watchEffect(() => {
      const context = {
        size: props2.size,
        shape: props2.shape
      };
      useAvatarProviderContext(context);
    });
    return () => {
      const {
        maxPopoverPlacement = "top",
        maxCount,
        maxStyle,
        maxPopoverTrigger = "hover",
        shape
      } = props2;
      const cls = {
        [groupPrefixCls.value]: true,
        [`${groupPrefixCls.value}-rtl`]: direction.value === "rtl",
        [`${attrs.class}`]: !!attrs.class,
        [hashId.value]: true
      };
      const children = getPropsSlot(slots, props2);
      const childrenWithProps = flattenChildren(children).map((child, index) => cloneElement(child, {
        key: `avatar-key-${index}`
      }));
      const numOfChildren = childrenWithProps.length;
      if (maxCount && maxCount < numOfChildren) {
        const childrenShow = childrenWithProps.slice(0, maxCount);
        const childrenHidden = childrenWithProps.slice(maxCount, numOfChildren);
        childrenShow.push(createVNode(Popover$1, {
          "key": "avatar-popover-key",
          "content": childrenHidden,
          "trigger": maxPopoverTrigger,
          "placement": maxPopoverPlacement,
          "overlayClassName": `${groupPrefixCls.value}-popover`
        }, {
          default: () => [createVNode(Avatar$1, {
            "style": maxStyle,
            "shape": shape
          }, {
            default: () => [`+${numOfChildren - maxCount}`]
          })]
        }));
        return wrapSSR(createVNode("div", _objectSpread$1(_objectSpread$1({}, attrs), {}, {
          "class": cls,
          "style": attrs.style
        }), [childrenShow]));
      }
      return wrapSSR(createVNode("div", _objectSpread$1(_objectSpread$1({}, attrs), {}, {
        "class": cls,
        "style": attrs.style
      }), [childrenWithProps]));
    };
  }
});
const Group$1 = Group;
Avatar$1.Group = Group$1;
Avatar$1.install = function(app) {
  app.component(Avatar$1.name, Avatar$1);
  app.component(Group$1.name, Group$1);
  return app;
};
const genTagStatusStyle = (token, status, cssVariableType) => {
  const capitalizedCssVariableType = capitalize(cssVariableType);
  return {
    [`${token.componentCls}-${status}`]: {
      color: token[`color${cssVariableType}`],
      background: token[`color${capitalizedCssVariableType}Bg`],
      borderColor: token[`color${capitalizedCssVariableType}Border`],
      [`&${token.componentCls}-borderless`]: {
        borderColor: "transparent"
      }
    }
  };
};
const genPresetStyle = (token) => genPresetColor(token, (colorKey, _ref) => {
  let {
    textColor,
    lightBorderColor,
    lightColor,
    darkColor
  } = _ref;
  return {
    [`${token.componentCls}-${colorKey}`]: {
      color: textColor,
      background: lightColor,
      borderColor: lightBorderColor,
      // Inverse color
      "&-inverse": {
        color: token.colorTextLightSolid,
        background: darkColor,
        borderColor: darkColor
      },
      [`&${token.componentCls}-borderless`]: {
        borderColor: "transparent"
      }
    }
  };
});
const genBaseStyle = (token) => {
  const {
    paddingXXS,
    lineWidth,
    tagPaddingHorizontal,
    componentCls
  } = token;
  const paddingInline = tagPaddingHorizontal - lineWidth;
  const iconMarginInline = paddingXXS - lineWidth;
  return {
    // Result
    [componentCls]: _extends(_extends({}, resetComponent(token)), {
      display: "inline-block",
      height: "auto",
      marginInlineEnd: token.marginXS,
      paddingInline,
      fontSize: token.tagFontSize,
      lineHeight: `${token.tagLineHeight}px`,
      whiteSpace: "nowrap",
      background: token.tagDefaultBg,
      border: `${token.lineWidth}px ${token.lineType} ${token.colorBorder}`,
      borderRadius: token.borderRadiusSM,
      opacity: 1,
      transition: `all ${token.motionDurationMid}`,
      textAlign: "start",
      // RTL
      [`&${componentCls}-rtl`]: {
        direction: "rtl"
      },
      "&, a, a:hover": {
        color: token.tagDefaultColor
      },
      [`${componentCls}-close-icon`]: {
        marginInlineStart: iconMarginInline,
        color: token.colorTextDescription,
        fontSize: token.tagIconSize,
        cursor: "pointer",
        transition: `all ${token.motionDurationMid}`,
        "&:hover": {
          color: token.colorTextHeading
        }
      },
      [`&${componentCls}-has-color`]: {
        borderColor: "transparent",
        [`&, a, a:hover, ${token.iconCls}-close, ${token.iconCls}-close:hover`]: {
          color: token.colorTextLightSolid
        }
      },
      [`&-checkable`]: {
        backgroundColor: "transparent",
        borderColor: "transparent",
        cursor: "pointer",
        [`&:not(${componentCls}-checkable-checked):hover`]: {
          color: token.colorPrimary,
          backgroundColor: token.colorFillSecondary
        },
        "&:active, &-checked": {
          color: token.colorTextLightSolid
        },
        "&-checked": {
          backgroundColor: token.colorPrimary,
          "&:hover": {
            backgroundColor: token.colorPrimaryHover
          }
        },
        "&:active": {
          backgroundColor: token.colorPrimaryActive
        }
      },
      [`&-hidden`]: {
        display: "none"
      },
      // To ensure that a space will be placed between character and `Icon`.
      [`> ${token.iconCls} + span, > span + ${token.iconCls}`]: {
        marginInlineStart: paddingInline
      }
    }),
    [`${componentCls}-borderless`]: {
      borderColor: "transparent",
      background: token.tagBorderlessBg
    }
  };
};
const useStyle$2 = genComponentStyleHook("Tag", (token) => {
  const {
    fontSize,
    lineHeight,
    lineWidth,
    fontSizeIcon
  } = token;
  const tagHeight = Math.round(fontSize * lineHeight);
  const tagFontSize = token.fontSizeSM;
  const tagLineHeight = tagHeight - lineWidth * 2;
  const tagDefaultBg = token.colorFillAlter;
  const tagDefaultColor = token.colorText;
  const tagToken = merge(token, {
    tagFontSize,
    tagLineHeight,
    tagDefaultBg,
    tagDefaultColor,
    tagIconSize: fontSizeIcon - 2 * lineWidth,
    tagPaddingHorizontal: 8,
    tagBorderlessBg: token.colorFillTertiary
  });
  return [genBaseStyle(tagToken), genPresetStyle(tagToken), genTagStatusStyle(tagToken, "success", "Success"), genTagStatusStyle(tagToken, "processing", "Info"), genTagStatusStyle(tagToken, "error", "Error"), genTagStatusStyle(tagToken, "warning", "Warning")];
});
const checkableTagProps = () => ({
  prefixCls: String,
  checked: {
    type: Boolean,
    default: void 0
  },
  onChange: {
    type: Function
  },
  onClick: {
    type: Function
  },
  "onUpdate:checked": Function
});
const CheckableTag = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "ACheckableTag",
  inheritAttrs: false,
  props: checkableTagProps(),
  // emits: ['update:checked', 'change', 'click'],
  setup(props2, _ref) {
    let {
      slots,
      emit,
      attrs
    } = _ref;
    const {
      prefixCls
    } = useConfigInject("tag", props2);
    const [wrapSSR, hashId] = useStyle$2(prefixCls);
    const handleClick = (e) => {
      const {
        checked
      } = props2;
      emit("update:checked", !checked);
      emit("change", !checked);
      emit("click", e);
    };
    const cls = computed(() => classNames(prefixCls.value, hashId.value, {
      [`${prefixCls.value}-checkable`]: true,
      [`${prefixCls.value}-checkable-checked`]: props2.checked
    }));
    return () => {
      var _a;
      return wrapSSR(createVNode("span", _objectSpread$1(_objectSpread$1({}, attrs), {}, {
        "class": [cls.value, attrs.class],
        "onClick": handleClick
      }), [(_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots)]));
    };
  }
});
const CheckableTag$1 = CheckableTag;
const tagProps = () => ({
  prefixCls: String,
  color: {
    type: String
  },
  closable: {
    type: Boolean,
    default: false
  },
  closeIcon: PropTypes.any,
  /** @deprecated `visible` will be removed in next major version. */
  visible: {
    type: Boolean,
    default: void 0
  },
  onClose: {
    type: Function
  },
  onClick: eventType(),
  "onUpdate:visible": Function,
  icon: PropTypes.any,
  bordered: {
    type: Boolean,
    default: true
  }
});
const Tag = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "ATag",
  inheritAttrs: false,
  props: tagProps(),
  // emits: ['update:visible', 'close'],
  slots: Object,
  setup(props2, _ref) {
    let {
      slots,
      emit,
      attrs
    } = _ref;
    const {
      prefixCls,
      direction
    } = useConfigInject("tag", props2);
    const [wrapSSR, hashId] = useStyle$2(prefixCls);
    const visible = shallowRef(true);
    watchEffect(() => {
      if (props2.visible !== void 0) {
        visible.value = props2.visible;
      }
    });
    const handleCloseClick = (e) => {
      e.stopPropagation();
      emit("update:visible", false);
      emit("close", e);
      if (e.defaultPrevented) {
        return;
      }
      if (props2.visible === void 0) {
        visible.value = false;
      }
    };
    const isInternalColor = computed(() => isPresetColor(props2.color) || isPresetStatusColor(props2.color));
    const tagClassName = computed(() => classNames(prefixCls.value, hashId.value, {
      [`${prefixCls.value}-${props2.color}`]: isInternalColor.value,
      [`${prefixCls.value}-has-color`]: props2.color && !isInternalColor.value,
      [`${prefixCls.value}-hidden`]: !visible.value,
      [`${prefixCls.value}-rtl`]: direction.value === "rtl",
      [`${prefixCls.value}-borderless`]: !props2.bordered
    }));
    const handleClick = (e) => {
      emit("click", e);
    };
    return () => {
      var _a, _b, _c;
      const {
        icon = (_a = slots.icon) === null || _a === void 0 ? void 0 : _a.call(slots),
        color,
        closeIcon = (_b = slots.closeIcon) === null || _b === void 0 ? void 0 : _b.call(slots),
        closable = false
      } = props2;
      const renderCloseIcon = () => {
        if (closable) {
          return closeIcon ? createVNode("span", {
            "class": `${prefixCls.value}-close-icon`,
            "onClick": handleCloseClick
          }, [closeIcon]) : createVNode(CloseOutlined$1, {
            "class": `${prefixCls.value}-close-icon`,
            "onClick": handleCloseClick
          }, null);
        }
        return null;
      };
      const tagStyle = {
        backgroundColor: color && !isInternalColor.value ? color : void 0
      };
      const iconNode = icon || null;
      const children = (_c = slots.default) === null || _c === void 0 ? void 0 : _c.call(slots);
      const kids = iconNode ? createVNode(Fragment, null, [iconNode, createVNode("span", null, [children])]) : children;
      const isNeedWave = props2.onClick !== void 0;
      const tagNode = createVNode("span", _objectSpread$1(_objectSpread$1({}, attrs), {}, {
        "onClick": handleClick,
        "class": [tagClassName.value, attrs.class],
        "style": [tagStyle, attrs.style]
      }), [kids, renderCloseIcon()]);
      return wrapSSR(isNeedWave ? createVNode(Wave, null, {
        default: () => [tagNode]
      }) : tagNode);
    };
  }
});
Tag.CheckableTag = CheckableTag$1;
Tag.install = function(app) {
  app.component(Tag.name, Tag);
  app.component(CheckableTag$1.name, CheckableTag$1);
  return app;
};
const __nuxt_component_3 = Tag;
const props = () => ({
  prefixCls: String,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: {
    type: Object,
    default: void 0
  },
  class: String,
  rootClassName: String,
  rootStyle: objectType(),
  placement: {
    type: String
  },
  wrapperClassName: String,
  level: {
    type: [String, Array]
  },
  levelMove: {
    type: [Number, Function, Array]
  },
  duration: String,
  ease: String,
  showMask: {
    type: Boolean,
    default: void 0
  },
  maskClosable: {
    type: Boolean,
    default: void 0
  },
  maskStyle: {
    type: Object,
    default: void 0
  },
  afterVisibleChange: Function,
  keyboard: {
    type: Boolean,
    default: void 0
  },
  contentWrapperStyle: arrayType(),
  autofocus: {
    type: Boolean,
    default: void 0
  },
  open: {
    type: Boolean,
    default: void 0
  },
  // Motion
  motion: functionType(),
  maskMotion: objectType()
});
const drawerProps$1 = () => _extends(_extends({}, props()), {
  forceRender: {
    type: Boolean,
    default: void 0
  },
  getContainer: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object, PropTypes.looseBool])
});
const drawerChildProps = () => _extends(_extends({}, props()), {
  getContainer: Function,
  getOpenCount: Function,
  scrollLocker: PropTypes.any,
  inline: Boolean
});
var __rest$3 = function(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
const DrawerChild = defineComponent({
  compatConfig: {
    MODE: 3
  },
  inheritAttrs: false,
  props: drawerChildProps(),
  emits: ["close", "handleClick", "change"],
  setup(props2, _ref) {
    let {
      emit,
      slots
    } = _ref;
    const contentWrapper = shallowRef();
    const dom = shallowRef();
    const maskDom = shallowRef();
    const handlerDom = shallowRef();
    const contentDom = shallowRef();
    `drawer_id_${Number((Date.now() + Math.random()).toString().replace(".", Math.round(Math.random() * 9).toString())).toString(16)}`;
    watch(() => props2.level, () => {
      getLevelDom();
    }, {
      flush: "post"
    });
    watch(() => props2.open, () => {
      const {
        open,
        getContainer,
        scrollLocker,
        showMask,
        autofocus
      } = props2;
      const container = getContainer === null || getContainer === void 0 ? void 0 : getContainer();
      if (container && container.parentNode === (void 0).body)
        ;
      if (open) {
        if (autofocus) {
          domFocus();
        }
        if (showMask) {
          scrollLocker === null || scrollLocker === void 0 ? void 0 : scrollLocker.lock();
        }
      } else {
        scrollLocker === null || scrollLocker === void 0 ? void 0 : scrollLocker.unLock();
      }
    }, {
      flush: "post"
    });
    onUnmounted(() => {
      var _a;
      const {
        open
      } = props2;
      if (open) {
        (void 0).body.style.touchAction = "";
      }
      (_a = props2.scrollLocker) === null || _a === void 0 ? void 0 : _a.unLock();
    });
    watch(() => props2.placement, (val) => {
      if (val) {
        contentDom.value = null;
      }
    });
    const domFocus = () => {
      var _a, _b;
      (_b = (_a = dom.value) === null || _a === void 0 ? void 0 : _a.focus) === null || _b === void 0 ? void 0 : _b.call(_a);
    };
    const onClose = (e) => {
      emit("close", e);
    };
    const onKeyDown = (e) => {
      if (e.keyCode === KeyCode$1.ESC) {
        e.stopPropagation();
        onClose(e);
      }
    };
    const onAfterVisibleChange = () => {
      const {
        open,
        afterVisibleChange
      } = props2;
      if (afterVisibleChange) {
        afterVisibleChange(!!open);
      }
    };
    const getLevelDom = (_ref2) => {
      {
        return;
      }
    };
    const onHandleClick = (e) => {
      emit("handleClick", e);
    };
    const canOpen = shallowRef(false);
    watch(dom, () => {
      nextTick(() => {
        canOpen.value = true;
      });
    });
    return () => {
      var _a, _b;
      const {
        width,
        height,
        open: $open,
        prefixCls,
        placement,
        level,
        levelMove,
        ease,
        duration,
        getContainer,
        onChange,
        afterVisibleChange,
        showMask,
        maskClosable,
        maskStyle,
        keyboard,
        getOpenCount,
        scrollLocker,
        contentWrapperStyle,
        style,
        class: className,
        rootClassName,
        rootStyle,
        maskMotion,
        motion,
        inline
      } = props2, otherProps = __rest$3(props2, ["width", "height", "open", "prefixCls", "placement", "level", "levelMove", "ease", "duration", "getContainer", "onChange", "afterVisibleChange", "showMask", "maskClosable", "maskStyle", "keyboard", "getOpenCount", "scrollLocker", "contentWrapperStyle", "style", "class", "rootClassName", "rootStyle", "maskMotion", "motion", "inline"]);
      const open = $open && canOpen.value;
      const wrapperClassName = classNames(prefixCls, {
        [`${prefixCls}-${placement}`]: true,
        [`${prefixCls}-open`]: open,
        [`${prefixCls}-inline`]: inline,
        "no-mask": !showMask,
        [rootClassName]: true
      });
      const motionProps = typeof motion === "function" ? motion(placement) : motion;
      return createVNode("div", _objectSpread$1(_objectSpread$1({}, omit(otherProps, ["autofocus"])), {}, {
        "tabindex": -1,
        "class": wrapperClassName,
        "style": rootStyle,
        "ref": dom,
        "onKeydown": open && keyboard ? onKeyDown : void 0
      }), [createVNode(Transition, maskMotion, {
        default: () => [showMask && withDirectives(createVNode("div", {
          "class": `${prefixCls}-mask`,
          "onClick": maskClosable ? onClose : void 0,
          "style": maskStyle,
          "ref": maskDom
        }, null), [[vShow, open]])]
      }), createVNode(Transition, _objectSpread$1(_objectSpread$1({}, motionProps), {}, {
        "onAfterEnter": onAfterVisibleChange,
        "onAfterLeave": onAfterVisibleChange
      }), {
        default: () => [withDirectives(createVNode("div", {
          "class": `${prefixCls}-content-wrapper`,
          "style": [contentWrapperStyle],
          "ref": contentWrapper
        }, [createVNode("div", {
          "class": [`${prefixCls}-content`, className],
          "style": style,
          "ref": contentDom
        }, [(_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots)]), slots.handler ? createVNode("div", {
          "onClick": onHandleClick,
          "ref": handlerDom
        }, [(_b = slots.handler) === null || _b === void 0 ? void 0 : _b.call(slots)]) : null]), [[vShow, open]])]
      })]);
    };
  }
});
const Child = DrawerChild;
var __rest$2 = function(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
const DrawerWrapper = defineComponent({
  compatConfig: {
    MODE: 3
  },
  inheritAttrs: false,
  props: initDefaultProps(drawerProps$1(), {
    prefixCls: "drawer",
    placement: "left",
    getContainer: "body",
    level: "all",
    duration: ".3s",
    ease: "cubic-bezier(0.78, 0.14, 0.15, 0.86)",
    afterVisibleChange: () => {
    },
    showMask: true,
    maskClosable: true,
    maskStyle: {},
    wrapperClassName: "",
    keyboard: true,
    forceRender: false,
    autofocus: true
  }),
  emits: ["handleClick", "close"],
  setup(props2, _ref) {
    let {
      emit,
      slots
    } = _ref;
    const dom = ref(null);
    const onHandleClick = (e) => {
      emit("handleClick", e);
    };
    const onClose = (e) => {
      emit("close", e);
    };
    return () => {
      const {
        getContainer,
        wrapperClassName,
        rootClassName,
        rootStyle,
        forceRender
      } = props2, otherProps = __rest$2(props2, ["getContainer", "wrapperClassName", "rootClassName", "rootStyle", "forceRender"]);
      let portal = null;
      if (!getContainer) {
        return createVNode(Child, _objectSpread$1(_objectSpread$1({}, otherProps), {}, {
          "rootClassName": rootClassName,
          "rootStyle": rootStyle,
          "open": props2.open,
          "onClose": onClose,
          "onHandleClick": onHandleClick,
          "inline": true
        }), slots);
      }
      const $forceRender = !!slots.handler || forceRender;
      if ($forceRender || props2.open || dom.value) {
        portal = createVNode(Portal, {
          "autoLock": true,
          "visible": props2.open,
          "forceRender": $forceRender,
          "getContainer": getContainer,
          "wrapperClassName": wrapperClassName
        }, {
          default: (_a) => {
            var {
              visible,
              afterClose
            } = _a, rest = __rest$2(_a, ["visible", "afterClose"]);
            return createVNode(Child, _objectSpread$1(_objectSpread$1(_objectSpread$1({
              "ref": dom
            }, otherProps), rest), {}, {
              "rootClassName": rootClassName,
              "rootStyle": rootStyle,
              "open": visible !== void 0 ? visible : props2.open,
              "afterVisibleChange": afterClose !== void 0 ? afterClose : props2.afterVisibleChange,
              "onClose": onClose,
              "onHandleClick": onHandleClick
            }), slots);
          }
        });
      }
      return portal;
    };
  }
});
const Drawer$1 = DrawerWrapper;
const genMotionStyle = (token) => {
  const {
    componentCls,
    motionDurationSlow
  } = token;
  const sharedPanelMotion = {
    "&-enter, &-appear, &-leave": {
      "&-start": {
        transition: "none"
      },
      "&-active": {
        transition: `all ${motionDurationSlow}`
      }
    }
  };
  return {
    [componentCls]: {
      // ======================== Mask ========================
      [`${componentCls}-mask-motion`]: {
        "&-enter, &-appear, &-leave": {
          "&-active": {
            transition: `all ${motionDurationSlow}`
          }
        },
        "&-enter, &-appear": {
          opacity: 0,
          "&-active": {
            opacity: 1
          }
        },
        "&-leave": {
          opacity: 1,
          "&-active": {
            opacity: 0
          }
        }
      },
      // ======================= Panel ========================
      [`${componentCls}-panel-motion`]: {
        // Left
        "&-left": [sharedPanelMotion, {
          "&-enter, &-appear": {
            "&-start": {
              transform: "translateX(-100%) !important"
            },
            "&-active": {
              transform: "translateX(0)"
            }
          },
          "&-leave": {
            transform: "translateX(0)",
            "&-active": {
              transform: "translateX(-100%)"
            }
          }
        }],
        // Right
        "&-right": [sharedPanelMotion, {
          "&-enter, &-appear": {
            "&-start": {
              transform: "translateX(100%) !important"
            },
            "&-active": {
              transform: "translateX(0)"
            }
          },
          "&-leave": {
            transform: "translateX(0)",
            "&-active": {
              transform: "translateX(100%)"
            }
          }
        }],
        // Top
        "&-top": [sharedPanelMotion, {
          "&-enter, &-appear": {
            "&-start": {
              transform: "translateY(-100%) !important"
            },
            "&-active": {
              transform: "translateY(0)"
            }
          },
          "&-leave": {
            transform: "translateY(0)",
            "&-active": {
              transform: "translateY(-100%)"
            }
          }
        }],
        // Bottom
        "&-bottom": [sharedPanelMotion, {
          "&-enter, &-appear": {
            "&-start": {
              transform: "translateY(100%) !important"
            },
            "&-active": {
              transform: "translateY(0)"
            }
          },
          "&-leave": {
            transform: "translateY(0)",
            "&-active": {
              transform: "translateY(100%)"
            }
          }
        }]
      }
    }
  };
};
const genDrawerStyle = (token) => {
  const {
    componentCls,
    zIndexPopup,
    colorBgMask,
    colorBgElevated,
    motionDurationSlow,
    motionDurationMid,
    padding,
    paddingLG,
    fontSizeLG,
    lineHeightLG,
    lineWidth,
    lineType,
    colorSplit,
    marginSM,
    colorIcon,
    colorIconHover,
    colorText,
    fontWeightStrong,
    drawerFooterPaddingVertical,
    drawerFooterPaddingHorizontal
  } = token;
  const wrapperCls = `${componentCls}-content-wrapper`;
  return {
    [componentCls]: {
      position: "fixed",
      inset: 0,
      zIndex: zIndexPopup,
      pointerEvents: "none",
      "&-pure": {
        position: "relative",
        background: colorBgElevated,
        [`&${componentCls}-left`]: {
          boxShadow: token.boxShadowDrawerLeft
        },
        [`&${componentCls}-right`]: {
          boxShadow: token.boxShadowDrawerRight
        },
        [`&${componentCls}-top`]: {
          boxShadow: token.boxShadowDrawerUp
        },
        [`&${componentCls}-bottom`]: {
          boxShadow: token.boxShadowDrawerDown
        }
      },
      "&-inline": {
        position: "absolute"
      },
      // ====================== Mask ======================
      [`${componentCls}-mask`]: {
        position: "absolute",
        inset: 0,
        zIndex: zIndexPopup,
        background: colorBgMask,
        pointerEvents: "auto"
      },
      // ==================== Content =====================
      [wrapperCls]: {
        position: "absolute",
        zIndex: zIndexPopup,
        transition: `all ${motionDurationSlow}`,
        "&-hidden": {
          display: "none"
        }
      },
      // Placement
      [`&-left > ${wrapperCls}`]: {
        top: 0,
        bottom: 0,
        left: {
          _skip_check_: true,
          value: 0
        },
        boxShadow: token.boxShadowDrawerLeft
      },
      [`&-right > ${wrapperCls}`]: {
        top: 0,
        right: {
          _skip_check_: true,
          value: 0
        },
        bottom: 0,
        boxShadow: token.boxShadowDrawerRight
      },
      [`&-top > ${wrapperCls}`]: {
        top: 0,
        insetInline: 0,
        boxShadow: token.boxShadowDrawerUp
      },
      [`&-bottom > ${wrapperCls}`]: {
        bottom: 0,
        insetInline: 0,
        boxShadow: token.boxShadowDrawerDown
      },
      [`${componentCls}-content`]: {
        width: "100%",
        height: "100%",
        overflow: "auto",
        background: colorBgElevated,
        pointerEvents: "auto"
      },
      // ===================== Panel ======================
      [`${componentCls}-wrapper-body`]: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%"
      },
      // Header
      [`${componentCls}-header`]: {
        display: "flex",
        flex: 0,
        alignItems: "center",
        padding: `${padding}px ${paddingLG}px`,
        fontSize: fontSizeLG,
        lineHeight: lineHeightLG,
        borderBottom: `${lineWidth}px ${lineType} ${colorSplit}`,
        "&-title": {
          display: "flex",
          flex: 1,
          alignItems: "center",
          minWidth: 0,
          minHeight: 0
        }
      },
      [`${componentCls}-extra`]: {
        flex: "none"
      },
      [`${componentCls}-close`]: {
        display: "inline-block",
        marginInlineEnd: marginSM,
        color: colorIcon,
        fontWeight: fontWeightStrong,
        fontSize: fontSizeLG,
        fontStyle: "normal",
        lineHeight: 1,
        textAlign: "center",
        textTransform: "none",
        textDecoration: "none",
        background: "transparent",
        border: 0,
        outline: 0,
        cursor: "pointer",
        transition: `color ${motionDurationMid}`,
        textRendering: "auto",
        "&:focus, &:hover": {
          color: colorIconHover,
          textDecoration: "none"
        }
      },
      [`${componentCls}-title`]: {
        flex: 1,
        margin: 0,
        color: colorText,
        fontWeight: token.fontWeightStrong,
        fontSize: fontSizeLG,
        lineHeight: lineHeightLG
      },
      // Body
      [`${componentCls}-body`]: {
        flex: 1,
        minWidth: 0,
        minHeight: 0,
        padding: paddingLG,
        overflow: "auto"
      },
      // Footer
      [`${componentCls}-footer`]: {
        flexShrink: 0,
        padding: `${drawerFooterPaddingVertical}px ${drawerFooterPaddingHorizontal}px`,
        borderTop: `${lineWidth}px ${lineType} ${colorSplit}`
      },
      // ====================== RTL =======================
      "&-rtl": {
        direction: "rtl"
      }
    }
  };
};
const useStyle$1 = genComponentStyleHook("Drawer", (token) => {
  const drawerToken = merge(token, {
    drawerFooterPaddingVertical: token.paddingXS,
    drawerFooterPaddingHorizontal: token.padding
  });
  return [genDrawerStyle(drawerToken), genMotionStyle(drawerToken)];
}, (token) => ({
  zIndexPopup: token.zIndexPopupBase
}));
var __rest$1 = function(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
const PlacementTypes = ["top", "right", "bottom", "left"];
const defaultPushState = {
  distance: 180
};
const drawerProps = () => ({
  autofocus: {
    type: Boolean,
    default: void 0
  },
  closable: {
    type: Boolean,
    default: void 0
  },
  closeIcon: PropTypes.any,
  destroyOnClose: {
    type: Boolean,
    default: void 0
  },
  forceRender: {
    type: Boolean,
    default: void 0
  },
  getContainer: {
    type: [String, Function, Boolean, Object],
    default: void 0
  },
  maskClosable: {
    type: Boolean,
    default: void 0
  },
  mask: {
    type: Boolean,
    default: void 0
  },
  maskStyle: objectType(),
  rootClassName: String,
  rootStyle: objectType(),
  size: {
    type: String
  },
  drawerStyle: objectType(),
  headerStyle: objectType(),
  bodyStyle: objectType(),
  contentWrapperStyle: {
    type: Object,
    default: void 0
  },
  title: PropTypes.any,
  /** @deprecated Please use `open` instead */
  visible: {
    type: Boolean,
    default: void 0
  },
  open: {
    type: Boolean,
    default: void 0
  },
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  zIndex: Number,
  prefixCls: String,
  push: PropTypes.oneOfType([PropTypes.looseBool, {
    type: Object
  }]),
  placement: PropTypes.oneOf(PlacementTypes),
  keyboard: {
    type: Boolean,
    default: void 0
  },
  extra: PropTypes.any,
  footer: PropTypes.any,
  footerStyle: objectType(),
  level: PropTypes.any,
  levelMove: {
    type: [Number, Array, Function]
  },
  handle: PropTypes.any,
  /** @deprecated Use `@afterVisibleChange` instead */
  afterVisibleChange: Function,
  /** @deprecated Please use `@afterOpenChange` instead */
  onAfterVisibleChange: Function,
  onAfterOpenChange: Function,
  /** @deprecated Please use `onUpdate:open` instead */
  "onUpdate:visible": Function,
  "onUpdate:open": Function,
  onClose: Function
});
const Drawer = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "ADrawer",
  inheritAttrs: false,
  props: initDefaultProps(drawerProps(), {
    closable: true,
    placement: "right",
    maskClosable: true,
    mask: true,
    level: null,
    keyboard: true,
    push: defaultPushState
  }),
  slots: Object,
  // emits: ['update:visible', 'close', 'afterVisibleChange'],
  setup(props2, _ref) {
    let {
      emit,
      slots,
      attrs
    } = _ref;
    const sPush = shallowRef(false);
    const destroyClose = shallowRef(false);
    const vcDrawer = shallowRef(null);
    const load = shallowRef(false);
    const visible = shallowRef(false);
    const mergedOpen = computed(() => {
      var _a;
      return (_a = props2.open) !== null && _a !== void 0 ? _a : props2.visible;
    });
    watch(mergedOpen, () => {
      if (mergedOpen.value) {
        load.value = true;
      } else {
        visible.value = false;
      }
    }, {
      immediate: true
    });
    watch([mergedOpen, load], () => {
      if (mergedOpen.value && load.value) {
        visible.value = true;
      }
    }, {
      immediate: true
    });
    const parentDrawerOpts = inject("parentDrawerOpts", null);
    const {
      prefixCls,
      getPopupContainer,
      direction
    } = useConfigInject("drawer", props2);
    const [wrapSSR, hashId] = useStyle$1(prefixCls);
    const getContainer = computed(() => (
      // 有可能为 false，所以不能直接判断
      props2.getContainer === void 0 && (getPopupContainer === null || getPopupContainer === void 0 ? void 0 : getPopupContainer.value) ? () => getPopupContainer.value((void 0).body) : props2.getContainer
    ));
    devWarning(!props2.afterVisibleChange, "Drawer", "`afterVisibleChange` prop is deprecated, please use `@afterVisibleChange` event instead");
    const setPush = () => {
      sPush.value = true;
    };
    const setPull = () => {
      sPush.value = false;
      nextTick(() => {
        domFocus();
      });
    };
    provide("parentDrawerOpts", {
      setPush,
      setPull
    });
    onUnmounted(() => {
      if (parentDrawerOpts) {
        parentDrawerOpts.setPull();
      }
    });
    watch(visible, () => {
      if (parentDrawerOpts) {
        if (visible.value) {
          parentDrawerOpts.setPush();
        } else {
          parentDrawerOpts.setPull();
        }
      }
    }, {
      flush: "post"
    });
    const domFocus = () => {
      var _a, _b;
      (_b = (_a = vcDrawer.value) === null || _a === void 0 ? void 0 : _a.domFocus) === null || _b === void 0 ? void 0 : _b.call(_a);
    };
    const close = (e) => {
      emit("update:visible", false);
      emit("update:open", false);
      emit("close", e);
    };
    const afterVisibleChange = (open) => {
      var _a;
      if (!open) {
        if (destroyClose.value === false) {
          destroyClose.value = true;
        }
        if (props2.destroyOnClose) {
          load.value = false;
        }
      }
      (_a = props2.afterVisibleChange) === null || _a === void 0 ? void 0 : _a.call(props2, open);
      emit("afterVisibleChange", open);
      emit("afterOpenChange", open);
    };
    const pushTransform = computed(() => {
      const {
        push,
        placement
      } = props2;
      let distance;
      if (typeof push === "boolean") {
        distance = push ? defaultPushState.distance : 0;
      } else {
        distance = push.distance;
      }
      distance = parseFloat(String(distance || 0));
      if (placement === "left" || placement === "right") {
        return `translateX(${placement === "left" ? distance : -distance}px)`;
      }
      if (placement === "top" || placement === "bottom") {
        return `translateY(${placement === "top" ? distance : -distance}px)`;
      }
      return null;
    });
    const mergedWidth = computed(() => {
      var _a;
      return (_a = props2.width) !== null && _a !== void 0 ? _a : props2.size === "large" ? 736 : 378;
    });
    const mergedHeight = computed(() => {
      var _a;
      return (_a = props2.height) !== null && _a !== void 0 ? _a : props2.size === "large" ? 736 : 378;
    });
    const offsetStyle = computed(() => {
      const {
        mask,
        placement
      } = props2;
      if (!visible.value && !mask) {
        return {};
      }
      const val = {};
      if (placement === "left" || placement === "right") {
        val.width = isNumeric(mergedWidth.value) ? `${mergedWidth.value}px` : mergedWidth.value;
      } else {
        val.height = isNumeric(mergedHeight.value) ? `${mergedHeight.value}px` : mergedHeight.value;
      }
      return val;
    });
    const wrapperStyle = computed(() => {
      const {
        zIndex,
        contentWrapperStyle
      } = props2;
      const val = offsetStyle.value;
      return [{
        zIndex,
        transform: sPush.value ? pushTransform.value : void 0
      }, _extends({}, contentWrapperStyle), val];
    });
    const renderHeader = (prefixCls2) => {
      const {
        closable,
        headerStyle
      } = props2;
      const extra = getPropsSlot(slots, props2, "extra");
      const title = getPropsSlot(slots, props2, "title");
      if (!title && !closable) {
        return null;
      }
      return createVNode("div", {
        "class": classNames(`${prefixCls2}-header`, {
          [`${prefixCls2}-header-close-only`]: closable && !title && !extra
        }),
        "style": headerStyle
      }, [createVNode("div", {
        "class": `${prefixCls2}-header-title`
      }, [renderCloseIcon(prefixCls2), title && createVNode("div", {
        "class": `${prefixCls2}-title`
      }, [title])]), extra && createVNode("div", {
        "class": `${prefixCls2}-extra`
      }, [extra])]);
    };
    const renderCloseIcon = (prefixCls2) => {
      var _a;
      const {
        closable
      } = props2;
      const $closeIcon = slots.closeIcon ? (_a = slots.closeIcon) === null || _a === void 0 ? void 0 : _a.call(slots) : props2.closeIcon;
      return closable && createVNode("button", {
        "key": "closer",
        "onClick": close,
        "aria-label": "Close",
        "class": `${prefixCls2}-close`
      }, [$closeIcon === void 0 ? createVNode(CloseOutlined$1, null, null) : $closeIcon]);
    };
    const renderBody = (prefixCls2) => {
      var _a;
      if (destroyClose.value && !props2.forceRender && !load.value) {
        return null;
      }
      const {
        bodyStyle,
        drawerStyle
      } = props2;
      return createVNode("div", {
        "class": `${prefixCls2}-wrapper-body`,
        "style": drawerStyle
      }, [renderHeader(prefixCls2), createVNode("div", {
        "key": "body",
        "class": `${prefixCls2}-body`,
        "style": bodyStyle
      }, [(_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots)]), renderFooter(prefixCls2)]);
    };
    const renderFooter = (prefixCls2) => {
      const footer = getPropsSlot(slots, props2, "footer");
      if (!footer) {
        return null;
      }
      const footerClassName = `${prefixCls2}-footer`;
      return createVNode("div", {
        "class": footerClassName,
        "style": props2.footerStyle
      }, [footer]);
    };
    const drawerClassName = computed(() => classNames({
      "no-mask": !props2.mask,
      [`${prefixCls.value}-rtl`]: direction.value === "rtl"
    }, props2.rootClassName, hashId.value));
    const maskMotion = computed(() => {
      return getTransitionProps(getTransitionName(prefixCls.value, "mask-motion"));
    });
    const panelMotion = (motionPlacement) => {
      return getTransitionProps(getTransitionName(prefixCls.value, `panel-motion-${motionPlacement}`));
    };
    return () => {
      const {
        width,
        height,
        placement,
        mask,
        forceRender
      } = props2, rest = __rest$1(props2, ["width", "height", "placement", "mask", "forceRender"]);
      const vcDrawerProps = _extends(_extends(_extends({}, attrs), omit(rest, ["size", "closeIcon", "closable", "destroyOnClose", "drawerStyle", "headerStyle", "bodyStyle", "title", "push", "onAfterVisibleChange", "onClose", "onUpdate:visible", "onUpdate:open", "visible"])), {
        forceRender,
        onClose: close,
        afterVisibleChange,
        handler: false,
        prefixCls: prefixCls.value,
        open: visible.value,
        showMask: mask,
        placement,
        ref: vcDrawer
      });
      return wrapSSR(createVNode(NoCompactStyle, null, {
        default: () => [createVNode(Drawer$1, _objectSpread$1(_objectSpread$1({}, vcDrawerProps), {}, {
          "maskMotion": maskMotion.value,
          "motion": panelMotion,
          "width": mergedWidth.value,
          "height": mergedHeight.value,
          "getContainer": getContainer.value,
          "rootClassName": drawerClassName.value,
          "rootStyle": props2.rootStyle,
          "contentWrapperStyle": wrapperStyle.value
        }), {
          handler: props2.handle ? () => props2.handle : slots.handle,
          default: () => renderBody(prefixCls.value)
        })]
      }));
    };
  }
});
const __nuxt_component_7$1 = withInstall(Drawer);
const flexWrapValues = ["wrap", "nowrap", "wrap-reverse"];
const justifyContentValues = ["flex-start", "flex-end", "start", "end", "center", "space-between", "space-around", "space-evenly", "stretch", "normal", "left", "right"];
const alignItemsValues = ["center", "start", "end", "flex-start", "flex-end", "self-start", "self-end", "baseline", "normal", "stretch"];
const genClsWrap = (prefixCls, props2) => {
  const wrapCls = {};
  flexWrapValues.forEach((cssKey) => {
    wrapCls[`${prefixCls}-wrap-${cssKey}`] = props2.wrap === cssKey;
  });
  return wrapCls;
};
const genClsAlign = (prefixCls, props2) => {
  const alignCls = {};
  alignItemsValues.forEach((cssKey) => {
    alignCls[`${prefixCls}-align-${cssKey}`] = props2.align === cssKey;
  });
  alignCls[`${prefixCls}-align-stretch`] = !props2.align && !!props2.vertical;
  return alignCls;
};
const genClsJustify = (prefixCls, props2) => {
  const justifyCls = {};
  justifyContentValues.forEach((cssKey) => {
    justifyCls[`${prefixCls}-justify-${cssKey}`] = props2.justify === cssKey;
  });
  return justifyCls;
};
function createFlexClassNames(prefixCls, props2) {
  return classNames(_extends(_extends(_extends({}, genClsWrap(prefixCls, props2)), genClsAlign(prefixCls, props2)), genClsJustify(prefixCls, props2)));
}
const genFlexStyle = (token) => {
  const {
    componentCls
  } = token;
  return {
    [componentCls]: {
      display: "flex",
      "&-vertical": {
        flexDirection: "column"
      },
      "&-rtl": {
        direction: "rtl"
      },
      "&:empty": {
        display: "none"
      }
    }
  };
};
const genFlexGapStyle = (token) => {
  const {
    componentCls
  } = token;
  return {
    [componentCls]: {
      "&-gap-small": {
        gap: token.flexGapSM
      },
      "&-gap-middle": {
        gap: token.flexGap
      },
      "&-gap-large": {
        gap: token.flexGapLG
      }
    }
  };
};
const genFlexWrapStyle = (token) => {
  const {
    componentCls
  } = token;
  const wrapStyle = {};
  flexWrapValues.forEach((value) => {
    wrapStyle[`${componentCls}-wrap-${value}`] = {
      flexWrap: value
    };
  });
  return wrapStyle;
};
const genAlignItemsStyle = (token) => {
  const {
    componentCls
  } = token;
  const alignStyle = {};
  alignItemsValues.forEach((value) => {
    alignStyle[`${componentCls}-align-${value}`] = {
      alignItems: value
    };
  });
  return alignStyle;
};
const genJustifyContentStyle = (token) => {
  const {
    componentCls
  } = token;
  const justifyStyle = {};
  justifyContentValues.forEach((value) => {
    justifyStyle[`${componentCls}-justify-${value}`] = {
      justifyContent: value
    };
  });
  return justifyStyle;
};
const useStyle = genComponentStyleHook("Flex", (token) => {
  const flexToken = merge(token, {
    flexGapSM: token.paddingXS,
    flexGap: token.padding,
    flexGapLG: token.paddingLG
  });
  return [genFlexStyle(flexToken), genFlexGapStyle(flexToken), genFlexWrapStyle(flexToken), genAlignItemsStyle(flexToken), genJustifyContentStyle(flexToken)];
});
function isPresetSize(size) {
  return ["small", "middle", "large"].includes(size);
}
const flexProps = () => ({
  prefixCls: stringType(),
  vertical: booleanType(),
  wrap: stringType(),
  justify: stringType(),
  align: stringType(),
  flex: someType([Number, String]),
  gap: someType([Number, String]),
  component: anyType()
});
var __rest = function(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
const AFlex = defineComponent({
  name: "AFlex",
  inheritAttrs: false,
  props: flexProps(),
  setup(props2, _ref) {
    let {
      slots,
      attrs
    } = _ref;
    const {
      flex: ctxFlex,
      direction: ctxDirection
    } = useConfigContextInject();
    const {
      prefixCls
    } = useConfigInject("flex", props2);
    const [wrapSSR, hashId] = useStyle(prefixCls);
    const mergedCls = computed(() => {
      var _a;
      return [prefixCls.value, hashId.value, createFlexClassNames(prefixCls.value, props2), {
        [`${prefixCls.value}-rtl`]: ctxDirection.value === "rtl",
        [`${prefixCls.value}-gap-${props2.gap}`]: isPresetSize(props2.gap),
        [`${prefixCls.value}-vertical`]: (_a = props2.vertical) !== null && _a !== void 0 ? _a : ctxFlex === null || ctxFlex === void 0 ? void 0 : ctxFlex.value.vertical
      }];
    });
    return () => {
      var _a;
      const {
        flex,
        gap,
        component: Component = "div"
      } = props2, othersProps = __rest(props2, ["flex", "gap", "component"]);
      const mergedStyle = {};
      if (flex) {
        mergedStyle.flex = flex;
      }
      if (gap && !isPresetSize(gap)) {
        mergedStyle.gap = `${gap}px`;
      }
      return wrapSSR(createVNode(Component, _objectSpread$1({
        "class": [attrs.class, mergedCls.value],
        "style": [attrs.style, mergedStyle]
      }, omit(othersProps, ["justify", "wrap", "align", "vertical"])), {
        default: () => [(_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots)]
      }));
    };
  }
});
const __nuxt_component_4 = withInstall(AFlex);
const sidebarData = [
  { path: "/guide", name: "\u0E04\u0E39\u0E48\u0E21\u0E37\u0E2D", icon: MenuUnfoldOutlined, notify: 1 },
  { path: "/dashboard", name: "\u0E2B\u0E19\u0E49\u0E32\u0E40\u0E40\u0E23\u0E01", icon: MenuUnfoldOutlined, notify: 0 },
  {
    path: "#",
    name: "\u0E1D\u0E32\u0E01 - \u0E16\u0E2D\u0E19",
    icon: MenuFoldOutlined,
    notify: 0,
    children: [
      { path: "/deposit", name: "\u0E1D\u0E32\u0E01", icon: MenuUnfoldOutlined, notify: 0 },
      { path: "/withdraw", name: "\u0E16\u0E2D\u0E19", icon: MenuUnfoldOutlined, notify: 0 },
      { path: "/commission", name: "\u0E04\u0E2D\u0E21\u0E21\u0E34\u0E0A\u0E0A\u0E31\u0E19", icon: MenuUnfoldOutlined, notify: 0 },
      { path: "/deposit-withdraw", name: "\u0E1D\u0E32\u0E01 - \u0E16\u0E2D\u0E19 \u0E22\u0E49\u0E2D\u0E19\u0E2B\u0E25\u0E31\u0E07", icon: MenuUnfoldOutlined, notify: 0 },
      { path: "/credit-mobile", name: "\u0E40\u0E1E\u0E34\u0E48\u0E21 \u0E25\u0E14 \u0E40\u0E04\u0E23\u0E14\u0E34\u0E15\u0E21\u0E37\u0E2D", icon: MenuUnfoldOutlined, notify: 0 }
    ]
  },
  {
    path: "#",
    name: "\u0E42\u0E22\u0E01\u0E40\u0E07\u0E34\u0E19",
    icon: MenuFoldOutlined,
    notify: 0,
    children: [
      { path: "/deposit", name: "\u0E1B\u0E23\u0E30\u0E27\u0E31\u0E15\u0E34\u0E01\u0E32\u0E23\u0E42\u0E22\u0E01\u0E40\u0E07\u0E34\u0E19", icon: MenuUnfoldOutlined, notify: 0 },
      { path: "/withdraw", name: "\u0E15\u0E31\u0E49\u0E07\u0E04\u0E48\u0E32\u0E42\u0E22\u0E01\u0E40\u0E07\u0E34\u0E19\u0E2D\u0E2D\u0E42\u0E15\u0E49", icon: MenuUnfoldOutlined, notify: 0 },
      { path: "/commission", name: "\u0E2A\u0E23\u0E38\u0E1B\u0E42\u0E22\u0E01\u0E40\u0E07\u0E34\u0E19", icon: MenuUnfoldOutlined, notify: 0 }
    ]
  },
  { path: "/dashboard", name: "\u0E42\u0E1B\u0E23\u0E42\u0E21\u0E0A\u0E31\u0E48\u0E19", icon: MenuUnfoldOutlined, notify: 0 },
  {
    path: "#",
    name: "\u0E2A\u0E21\u0E32\u0E0A\u0E34\u0E01",
    icon: MenuFoldOutlined,
    notify: 0,
    children: [
      { path: "/deposit", name: "\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E2A\u0E21\u0E32\u0E0A\u0E34\u0E01", icon: MenuUnfoldOutlined, notify: 0 },
      { path: "/withdraw", name: "\u0E04\u0E37\u0E19\u0E22\u0E2D\u0E14\u0E40\u0E2A\u0E35\u0E22", icon: MenuUnfoldOutlined, notify: 0 },
      { path: "/commission", name: "\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E04\u0E37\u0E19\u0E22\u0E2D\u0E14\u0E40\u0E2A\u0E35\u0E22", icon: MenuUnfoldOutlined, notify: 0 }
    ]
  },
  {
    path: "#",
    name: "\u0E1B\u0E23\u0E30\u0E27\u0E31\u0E15\u0E34\u0E01\u0E32\u0E23\u0E17\u0E33\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23",
    icon: MenuFoldOutlined,
    notify: 0,
    children: [
      { path: "/deposit", name: "\u0E1B\u0E23\u0E30\u0E27\u0E31\u0E15\u0E34\u0E01\u0E32\u0E23\u0E1D\u0E32\u0E01", icon: MenuUnfoldOutlined, notify: 0 },
      { path: "/withdraw", name: "\u0E1B\u0E23\u0E30\u0E27\u0E31\u0E15\u0E34\u0E01\u0E32\u0E23\u0E16\u0E2D\u0E19", icon: MenuUnfoldOutlined, notify: 0 },
      { path: "/commission", name: "\u0E1B\u0E23\u0E30\u0E27\u0E31\u0E15\u0E34\u0E01\u0E32\u0E23\u0E17\u0E33\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E25\u0E39\u0E01\u0E04\u0E49\u0E32", icon: MenuUnfoldOutlined, notify: 0 },
      { path: "/commission", name: "\u0E1B\u0E23\u0E30\u0E27\u0E31\u0E15\u0E34\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23\u0E40\u0E04\u0E23\u0E14\u0E34\u0E15\u0E21\u0E37\u0E2D", icon: MenuUnfoldOutlined, notify: 0 },
      { path: "/commission", name: "\u0E1B\u0E23\u0E30\u0E27\u0E31\u0E15\u0E34\u0E01\u0E32\u0E23\u0E43\u0E0A\u0E49\u0E40\u0E2B\u0E23\u0E35\u0E22\u0E0D", icon: MenuUnfoldOutlined, notify: 0 }
    ]
  },
  {
    path: "#",
    name: "\u0E18\u0E19\u0E32\u0E04\u0E32\u0E23",
    icon: MenuFoldOutlined,
    notify: 0,
    children: [
      { path: "/deposit", name: "iBanking (\u0E40\u0E0A\u0E47\u0E04\u0E40\u0E07\u0E34\u0E19)", icon: MenuUnfoldOutlined, notify: 0 },
      { path: "/withdraw", name: "Statement \u0E08\u0E32\u0E01\u0E18\u0E19\u0E32\u0E04\u0E32\u0E23", icon: MenuUnfoldOutlined, notify: 0 }
    ]
  },
  {
    path: "#",
    name: "\u0E18\u0E19\u0E32\u0E04\u0E32\u0E23",
    icon: MenuFoldOutlined,
    notify: 0,
    children: [
      { path: "/deposit", name: "\u0E2A\u0E23\u0E38\u0E1B\u0E22\u0E39\u0E2A/\u0E04\u0E48\u0E32\u0E04\u0E2D\u0E21\u0E21\u0E34\u0E0A\u0E0A\u0E31\u0E48\u0E19", icon: MenuUnfoldOutlined, notify: 0 },
      { path: "/withdraw", name: "\u0E2A\u0E23\u0E38\u0E1B\u0E22\u0E2D\u0E14", icon: MenuUnfoldOutlined, notify: 0 },
      { path: "/withdraw", name: "\u0E2A\u0E23\u0E38\u0E1B\u0E42\u0E1A\u0E19\u0E31\u0E2A", icon: MenuUnfoldOutlined, notify: 0 },
      { path: "/withdraw", name: "\u0E2A\u0E23\u0E38\u0E1B\u0E20\u0E32\u0E1E\u0E23\u0E27\u0E21\u0E22\u0E49\u0E2D\u0E19\u0E2B\u0E25\u0E31\u0E07", icon: MenuUnfoldOutlined, notify: 0 }
    ]
  },
  { path: "/dashboard", name: "\u0E40\u0E40\u0E2D\u0E14\u0E21\u0E34\u0E19", icon: MenuUnfoldOutlined, notify: 0 },
  { path: "/dashboard", name: "\u0E08\u0E31\u0E14\u0E01\u0E32\u0E23\u0E1E\u0E31\u0E19\u0E18\u0E21\u0E34\u0E15\u0E23", icon: MenuUnfoldOutlined, notify: 0 },
  { path: "/dashboard", name: "\u0E1A\u0E31\u0E0D\u0E0A\u0E35", icon: MenuUnfoldOutlined, notify: 0 },
  {
    path: "#",
    name: "\u0E15\u0E31\u0E49\u0E07\u0E04\u0E48\u0E32",
    icon: MenuFoldOutlined,
    notify: 0,
    children: [
      { path: "/deposit", name: "\u0E15\u0E31\u0E49\u0E07\u0E04\u0E48\u0E32\u0E17\u0E31\u0E48\u0E27\u0E44\u0E1B", icon: MenuUnfoldOutlined, notify: 0 },
      // { path: '/withdraw', name: 'ตั้งค่าหน้าลูกค้า' , icon:MenuUnfoldOutlined},
      // { path: '/withdraw', name: 'ตั้งค่าธีมเข้าสู่ระบบ' , icon:MenuUnfoldOutlined},
      { path: "/withdraw", name: "\u0E15\u0E31\u0E49\u0E07\u0E04\u0E48\u0E32\u0E23\u0E30\u0E1A\u0E1A", icon: MenuUnfoldOutlined, notify: 0 },
      { path: "/withdraw", name: "\u0E15\u0E31\u0E49\u0E07\u0E04\u0E48\u0E32\u0E22\u0E40\u0E01\u0E21\u0E2A\u0E4C", icon: MenuUnfoldOutlined, notify: 0 }
    ]
  },
  // { 
  //   path: '#', 
  //   name: 'ตั้งค่ามินิเกมส์',
  //   icon: MenuFoldOutlined,
  //   notify: 0,
  //   children: [
  //       { path: '/deposit', name: 'ตั้งค่ากงล้อ' , icon:MenuUnfoldOutlined},
  //     ]
  // },
  { path: "/dashboard", name: "\u0E42\u0E1B\u0E23\u0E44\u0E1F\u0E25\u0E4C", icon: MenuUnfoldOutlined, notify: 0 },
  { path: "/dashboard", name: "Log", icon: MenuUnfoldOutlined, notify: 0 },
  { path: "/dashboard", name: "\u0E1A\u0E31\u0E0D\u0E0A\u0E35\u0E14\u0E33", icon: MenuUnfoldOutlined, notify: 0 },
  { path: "/dashboard", name: "\u0E2D\u0E2D\u0E01\u0E08\u0E32\u0E01\u0E23\u0E30\u0E1A\u0E1A", icon: MenuUnfoldOutlined, notify: 0 }
];
const sidebarData$1 = sidebarData;
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Sidebar",
  __ssrInlineRender: true,
  setup(__props) {
    const selectedKeys = ref(["1"]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_a_menu = Menu;
      const _component_a_menu_item = __nuxt_component_1;
      const _component_router_link = resolveComponent("router-link");
      const _component_a_sub_menu = __nuxt_component_2$1;
      _push(`<!--[--><div class="layout-logo"><img src="https://betflix24hours.imember.cc/img/websetting/1680175806.png" alt="AdminLTE Logo" width="50%"></div><div class="sidebar-layout"><div class="sidebar-list"><div class="sidebar-lists">`);
      _push(ssrRenderComponent(_component_a_menu, {
        selectedKeys: selectedKeys.value,
        "onUpdate:selectedKeys": ($event) => selectedKeys.value = $event,
        theme: "dark",
        mode: "inline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(unref(sidebarData$1), (item, index) => {
              _push2(`<!--[-->`);
              if (!item.children) {
                _push2(ssrRenderComponent(_component_a_menu_item, {
                  key: "menu-item-" + index
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      ssrRenderVNode(_push3, createVNode(resolveDynamicComponent(item.icon), { style: { margin: "0 10px" } }, null), _parent3, _scopeId2);
                      _push3(ssrRenderComponent(_component_router_link, {
                        to: item.path
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<span${_scopeId3}>${ssrInterpolate(item.name)}</span>`);
                          } else {
                            return [
                              createVNode("span", null, toDisplayString(item.name), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      if (item.notify !== 0) {
                        _push3(`<span class="new"${_scopeId2}><span class="badge padding-1"${_scopeId2}>${ssrInterpolate(item.notify)}</span></span>`);
                      } else {
                        _push3(`<!---->`);
                      }
                    } else {
                      return [
                        (openBlock(), createBlock(resolveDynamicComponent(item.icon), { style: { margin: "0 10px" } })),
                        createVNode(_component_router_link, {
                          to: item.path
                        }, {
                          default: withCtx(() => [
                            createVNode("span", null, toDisplayString(item.name), 1)
                          ]),
                          _: 2
                        }, 1032, ["to"]),
                        item.notify !== 0 ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "new"
                        }, [
                          createVNode("span", { class: "badge padding-1" }, toDisplayString(item.notify), 1)
                        ])) : createCommentVNode("", true)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                _push2(ssrRenderComponent(_component_a_sub_menu, {
                  key: "sub-menu-" + index
                }, {
                  title: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      ssrRenderVNode(_push3, createVNode(resolveDynamicComponent(item.icon), { style: { margin: "0 10px" } }, null), _parent3, _scopeId2);
                      _push3(`<span class="sub-link"${_scopeId2}>${ssrInterpolate(item.name)}</span>`);
                    } else {
                      return [
                        (openBlock(), createBlock(resolveDynamicComponent(item.icon), { style: { margin: "0 10px" } })),
                        createVNode("span", { class: "sub-link" }, toDisplayString(item.name), 1)
                      ];
                    }
                  }),
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<!--[-->`);
                      ssrRenderList(item.children, (child, childIndex) => {
                        _push3(ssrRenderComponent(_component_a_menu_item, null, {
                          default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                            if (_push4) {
                              ssrRenderVNode(_push4, createVNode(resolveDynamicComponent(child.icon), { style: { margin: "0 10px" } }, null), _parent4, _scopeId3);
                              _push4(ssrRenderComponent(_component_router_link, {
                                to: child.path
                              }, {
                                default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                  if (_push5) {
                                    _push5(`<span${_scopeId4}>${ssrInterpolate(child.name)}</span>`);
                                  } else {
                                    return [
                                      createVNode("span", null, toDisplayString(child.name), 1)
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent4, _scopeId3));
                              if (child.notify !== 0) {
                                _push4(`<span class="new"${_scopeId3}><span class="badge padding-1"${_scopeId3}>${ssrInterpolate(child.notify)}</span></span>`);
                              } else {
                                _push4(`<!---->`);
                              }
                            } else {
                              return [
                                (openBlock(), createBlock(resolveDynamicComponent(child.icon), { style: { margin: "0 10px" } })),
                                createVNode(_component_router_link, {
                                  to: child.path
                                }, {
                                  default: withCtx(() => [
                                    createVNode("span", null, toDisplayString(child.name), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["to"]),
                                child.notify !== 0 ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  class: "new"
                                }, [
                                  createVNode("span", { class: "badge padding-1" }, toDisplayString(child.notify), 1)
                                ])) : createCommentVNode("", true)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent3, _scopeId2));
                      });
                      _push3(`<!--]-->`);
                    } else {
                      return [
                        (openBlock(true), createBlock(Fragment, null, renderList(item.children, (child, childIndex) => {
                          return openBlock(), createBlock(_component_a_menu_item, {
                            key: child.path
                          }, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(resolveDynamicComponent(child.icon), { style: { margin: "0 10px" } })),
                              createVNode(_component_router_link, {
                                to: child.path
                              }, {
                                default: withCtx(() => [
                                  createVNode("span", null, toDisplayString(child.name), 1)
                                ]),
                                _: 2
                              }, 1032, ["to"]),
                              child.notify !== 0 ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "new"
                              }, [
                                createVNode("span", { class: "badge padding-1" }, toDisplayString(child.notify), 1)
                              ])) : createCommentVNode("", true)
                            ]),
                            _: 2
                          }, 1024);
                        }), 128))
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              }
              _push2(`<!--]-->`);
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(unref(sidebarData$1), (item, index) => {
                return openBlock(), createBlock(Fragment, { key: index }, [
                  !item.children ? (openBlock(), createBlock(_component_a_menu_item, {
                    key: "menu-item-" + index
                  }, {
                    default: withCtx(() => [
                      (openBlock(), createBlock(resolveDynamicComponent(item.icon), { style: { margin: "0 10px" } })),
                      createVNode(_component_router_link, {
                        to: item.path
                      }, {
                        default: withCtx(() => [
                          createVNode("span", null, toDisplayString(item.name), 1)
                        ]),
                        _: 2
                      }, 1032, ["to"]),
                      item.notify !== 0 ? (openBlock(), createBlock("span", {
                        key: 0,
                        class: "new"
                      }, [
                        createVNode("span", { class: "badge padding-1" }, toDisplayString(item.notify), 1)
                      ])) : createCommentVNode("", true)
                    ]),
                    _: 2
                  }, 1024)) : (openBlock(), createBlock(_component_a_sub_menu, {
                    key: "sub-menu-" + index
                  }, {
                    title: withCtx(() => [
                      (openBlock(), createBlock(resolveDynamicComponent(item.icon), { style: { margin: "0 10px" } })),
                      createVNode("span", { class: "sub-link" }, toDisplayString(item.name), 1)
                    ]),
                    default: withCtx(() => [
                      (openBlock(true), createBlock(Fragment, null, renderList(item.children, (child, childIndex) => {
                        return openBlock(), createBlock(_component_a_menu_item, {
                          key: child.path
                        }, {
                          default: withCtx(() => [
                            (openBlock(), createBlock(resolveDynamicComponent(child.icon), { style: { margin: "0 10px" } })),
                            createVNode(_component_router_link, {
                              to: child.path
                            }, {
                              default: withCtx(() => [
                                createVNode("span", null, toDisplayString(child.name), 1)
                              ]),
                              _: 2
                            }, 1032, ["to"]),
                            child.notify !== 0 ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "new"
                            }, [
                              createVNode("span", { class: "badge padding-1" }, toDisplayString(child.notify), 1)
                            ])) : createCommentVNode("", true)
                          ]),
                          _: 2
                        }, 1024);
                      }), 128))
                    ]),
                    _: 2
                  }, 1024))
                ], 64);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div><!--]-->`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props2, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Layout/Sidebar.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props2, ctx) : void 0;
};
const _sfc_main$1 = defineComponent({
  setup() {
    const visible = ref(false);
    const showDrawer = () => {
      visible.value = true;
    };
    const onClose = () => {
      visible.value = false;
    };
    return {
      visible,
      showDrawer,
      onClose
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_a_flex = __nuxt_component_4;
  const _component_a_button = Button;
  const _component_LanguagesLanguageComponent = __nuxt_component_2;
  const _component_a_tag = __nuxt_component_3;
  const _component_a_avatar = Avatar$1;
  const _component_UserOutlined = UserOutlined;
  const _component_LogoutOutlined = LogoutOutlined;
  const _component_a_drawer = __nuxt_component_7$1;
  _push(ssrRenderComponent(_component_a_flex, mergeProps({ class: "status-web" }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_a_flex, {
          class: "status-web-check border-right",
          vertical: ""
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_a_button, {
                type: "primary",
                size: "small",
                class: "m-auto danger"
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`\u0E1B\u0E34\u0E14\u0E40\u0E0B\u0E34\u0E23\u0E4C\u0E1F`);
                  } else {
                    return [
                      createTextVNode("\u0E1B\u0E34\u0E14\u0E40\u0E0B\u0E34\u0E23\u0E4C\u0E1F")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_a_button, {
                  type: "primary",
                  size: "small",
                  class: "m-auto danger"
                }, {
                  default: withCtx(() => [
                    createTextVNode("\u0E1B\u0E34\u0E14\u0E40\u0E0B\u0E34\u0E23\u0E4C\u0E1F")
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_a_flex, {
          class: "status-web-check border-right",
          vertical: ""
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class="m-auto"${_scopeId2}>`);
              _push3(ssrRenderComponent(_component_LanguagesLanguageComponent, { language: false }, null, _parent3, _scopeId2));
              _push3(`</div>`);
            } else {
              return [
                createVNode("div", { class: "m-auto" }, [
                  createVNode(_component_LanguagesLanguageComponent, { language: false })
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_a_flex, {
          class: "status-web-check border-right p-rl-2",
          vertical: ""
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class=""${_scopeId2}>team</div><div class="p-rl-1"${_scopeId2}>\u0E1C\u0E39\u0E49\u0E0A\u0E48\u0E27\u0E22\u0E40\u0E08\u0E49\u0E32\u0E02\u0E2D\u0E07\u0E40\u0E27\u0E47\u0E1A</div>`);
            } else {
              return [
                createVNode("div", { class: "" }, "team"),
                createVNode("div", { class: "p-rl-1" }, "\u0E1C\u0E39\u0E49\u0E0A\u0E48\u0E27\u0E22\u0E40\u0E08\u0E49\u0E32\u0E02\u0E2D\u0E07\u0E40\u0E27\u0E47\u0E1A")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_a_flex, {
          class: "status-web-check border-right p-rl-2 mobile-none",
          vertical: ""
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class=""${_scopeId2}>\u0E2D\u0E2D\u0E19\u0E44\u0E25\u0E19\u0E4C</div>`);
              _push3(ssrRenderComponent(_component_a_tag, {
                color: "green",
                class: "m-auto"
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`\u0E2D\u0E31\u0E15\u0E42\u0E19\u0E21\u0E31\u0E15\u0E34`);
                  } else {
                    return [
                      createTextVNode("\u0E2D\u0E31\u0E15\u0E42\u0E19\u0E21\u0E31\u0E15\u0E34")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode("div", { class: "" }, "\u0E2D\u0E2D\u0E19\u0E44\u0E25\u0E19\u0E4C"),
                createVNode(_component_a_tag, {
                  color: "green",
                  class: "m-auto"
                }, {
                  default: withCtx(() => [
                    createTextVNode("\u0E2D\u0E31\u0E15\u0E42\u0E19\u0E21\u0E31\u0E15\u0E34")
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_a_flex, {
          class: "status-web-check border-right p-rl-2 mobile-none",
          vertical: ""
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class=""${_scopeId2}>\u0E1D\u0E32\u0E01</div>`);
              _push3(ssrRenderComponent(_component_a_tag, {
                color: "green",
                class: "m-auto"
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`\u0E2D\u0E31\u0E15\u0E42\u0E19\u0E21\u0E31\u0E15\u0E34`);
                  } else {
                    return [
                      createTextVNode("\u0E2D\u0E31\u0E15\u0E42\u0E19\u0E21\u0E31\u0E15\u0E34")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode("div", { class: "" }, "\u0E1D\u0E32\u0E01"),
                createVNode(_component_a_tag, {
                  color: "green",
                  class: "m-auto"
                }, {
                  default: withCtx(() => [
                    createTextVNode("\u0E2D\u0E31\u0E15\u0E42\u0E19\u0E21\u0E31\u0E15\u0E34")
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_a_flex, {
          class: "status-web-check border-right p-rl-2 mobile-none",
          vertical: ""
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class=""${_scopeId2}>\u0E16\u0E2D\u0E19</div>`);
              _push3(ssrRenderComponent(_component_a_tag, {
                color: "green",
                class: "m-auto"
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`\u0E2D\u0E31\u0E15\u0E42\u0E19\u0E21\u0E31\u0E15\u0E34`);
                  } else {
                    return [
                      createTextVNode("\u0E2D\u0E31\u0E15\u0E42\u0E19\u0E21\u0E31\u0E15\u0E34")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode("div", { class: "" }, "\u0E16\u0E2D\u0E19"),
                createVNode(_component_a_tag, {
                  color: "green",
                  class: "m-auto"
                }, {
                  default: withCtx(() => [
                    createTextVNode("\u0E2D\u0E31\u0E15\u0E42\u0E19\u0E21\u0E31\u0E15\u0E34")
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_a_flex, {
          class: "status-web-check border-right p-rl-2 mobile-none",
          vertical: ""
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class=""${_scopeId2}>\u0E40\u0E27\u0E47\u0E1A</div>`);
              _push3(ssrRenderComponent(_component_a_tag, {
                color: "green",
                class: "m-auto"
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`\u0E40\u0E1B\u0E34\u0E14`);
                  } else {
                    return [
                      createTextVNode("\u0E40\u0E1B\u0E34\u0E14")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode("div", { class: "" }, "\u0E40\u0E27\u0E47\u0E1A"),
                createVNode(_component_a_tag, {
                  color: "green",
                  class: "m-auto"
                }, {
                  default: withCtx(() => [
                    createTextVNode("\u0E40\u0E1B\u0E34\u0E14")
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_a_flex, {
          class: "status-web-check border-right p-rl-2 mobile-none",
          vertical: ""
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div class=""${_scopeId2}>\u0E1D\u0E32\u0E01</div>`);
              _push3(ssrRenderComponent(_component_a_tag, {
                color: "green",
                class: "m-auto"
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`\u0E40\u0E1B\u0E34\u0E14`);
                  } else {
                    return [
                      createTextVNode("\u0E40\u0E1B\u0E34\u0E14")
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode("div", { class: "" }, "\u0E1D\u0E32\u0E01"),
                createVNode(_component_a_tag, {
                  color: "green",
                  class: "m-auto"
                }, {
                  default: withCtx(() => [
                    createTextVNode("\u0E40\u0E1B\u0E34\u0E14")
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<div class="m-auto p-rl-2 mobile"${_scopeId}>`);
        _push2(ssrRenderComponent(_component_a_avatar, {
          size: "large",
          onClick: _ctx.showDrawer
        }, {
          icon: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_UserOutlined, null, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_UserOutlined)
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`</div><div class="m-auto mobile-none"${_scopeId}>`);
        _push2(ssrRenderComponent(_component_LogoutOutlined, { class: "large-font p-rl-2 white-smoke-text" }, null, _parent2, _scopeId));
        _push2(`</div>`);
        _push2(ssrRenderComponent(_component_a_drawer, {
          title: "Basic Drawer",
          placement: "top",
          closable: false,
          visible: _ctx.visible,
          onClose: _ctx.onClose
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<p${_scopeId2}>Some contents...</p><p${_scopeId2}>Some contents...</p><p${_scopeId2}>Some contents...</p>`);
            } else {
              return [
                createVNode("p", null, "Some contents..."),
                createVNode("p", null, "Some contents..."),
                createVNode("p", null, "Some contents...")
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_a_flex, {
            class: "status-web-check border-right",
            vertical: ""
          }, {
            default: withCtx(() => [
              createVNode(_component_a_button, {
                type: "primary",
                size: "small",
                class: "m-auto danger"
              }, {
                default: withCtx(() => [
                  createTextVNode("\u0E1B\u0E34\u0E14\u0E40\u0E0B\u0E34\u0E23\u0E4C\u0E1F")
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(_component_a_flex, {
            class: "status-web-check border-right",
            vertical: ""
          }, {
            default: withCtx(() => [
              createVNode("div", { class: "m-auto" }, [
                createVNode(_component_LanguagesLanguageComponent, { language: false })
              ])
            ]),
            _: 1
          }),
          createVNode(_component_a_flex, {
            class: "status-web-check border-right p-rl-2",
            vertical: ""
          }, {
            default: withCtx(() => [
              createVNode("div", { class: "" }, "team"),
              createVNode("div", { class: "p-rl-1" }, "\u0E1C\u0E39\u0E49\u0E0A\u0E48\u0E27\u0E22\u0E40\u0E08\u0E49\u0E32\u0E02\u0E2D\u0E07\u0E40\u0E27\u0E47\u0E1A")
            ]),
            _: 1
          }),
          createVNode(_component_a_flex, {
            class: "status-web-check border-right p-rl-2 mobile-none",
            vertical: ""
          }, {
            default: withCtx(() => [
              createVNode("div", { class: "" }, "\u0E2D\u0E2D\u0E19\u0E44\u0E25\u0E19\u0E4C"),
              createVNode(_component_a_tag, {
                color: "green",
                class: "m-auto"
              }, {
                default: withCtx(() => [
                  createTextVNode("\u0E2D\u0E31\u0E15\u0E42\u0E19\u0E21\u0E31\u0E15\u0E34")
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(_component_a_flex, {
            class: "status-web-check border-right p-rl-2 mobile-none",
            vertical: ""
          }, {
            default: withCtx(() => [
              createVNode("div", { class: "" }, "\u0E1D\u0E32\u0E01"),
              createVNode(_component_a_tag, {
                color: "green",
                class: "m-auto"
              }, {
                default: withCtx(() => [
                  createTextVNode("\u0E2D\u0E31\u0E15\u0E42\u0E19\u0E21\u0E31\u0E15\u0E34")
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(_component_a_flex, {
            class: "status-web-check border-right p-rl-2 mobile-none",
            vertical: ""
          }, {
            default: withCtx(() => [
              createVNode("div", { class: "" }, "\u0E16\u0E2D\u0E19"),
              createVNode(_component_a_tag, {
                color: "green",
                class: "m-auto"
              }, {
                default: withCtx(() => [
                  createTextVNode("\u0E2D\u0E31\u0E15\u0E42\u0E19\u0E21\u0E31\u0E15\u0E34")
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(_component_a_flex, {
            class: "status-web-check border-right p-rl-2 mobile-none",
            vertical: ""
          }, {
            default: withCtx(() => [
              createVNode("div", { class: "" }, "\u0E40\u0E27\u0E47\u0E1A"),
              createVNode(_component_a_tag, {
                color: "green",
                class: "m-auto"
              }, {
                default: withCtx(() => [
                  createTextVNode("\u0E40\u0E1B\u0E34\u0E14")
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(_component_a_flex, {
            class: "status-web-check border-right p-rl-2 mobile-none",
            vertical: ""
          }, {
            default: withCtx(() => [
              createVNode("div", { class: "" }, "\u0E1D\u0E32\u0E01"),
              createVNode(_component_a_tag, {
                color: "green",
                class: "m-auto"
              }, {
                default: withCtx(() => [
                  createTextVNode("\u0E40\u0E1B\u0E34\u0E14")
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode("div", { class: "m-auto p-rl-2 mobile" }, [
            createVNode(_component_a_avatar, {
              size: "large",
              onClick: _ctx.showDrawer
            }, {
              icon: withCtx(() => [
                createVNode(_component_UserOutlined)
              ]),
              _: 1
            }, 8, ["onClick"])
          ]),
          createVNode("div", { class: "m-auto mobile-none" }, [
            createVNode(_component_LogoutOutlined, { class: "large-font p-rl-2 white-smoke-text" })
          ]),
          createVNode(_component_a_drawer, {
            title: "Basic Drawer",
            placement: "top",
            closable: false,
            visible: _ctx.visible,
            onClose: _ctx.onClose
          }, {
            default: withCtx(() => [
              createVNode("p", null, "Some contents..."),
              createVNode("p", null, "Some contents..."),
              createVNode("p", null, "Some contents...")
            ]),
            _: 1
          }, 8, ["visible", "onClose"])
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props2, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Layout/Header.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props2, ctx) : void 0;
};
const __nuxt_component_7 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const collapsed = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_a_layout = __nuxt_component_0;
      const _component_a_layout_sider = LayoutSider;
      const _component_LayoutSidebar = _sfc_main$2;
      const _component_a_layout_header = LayoutHeader;
      const _component_a_flex = __nuxt_component_4;
      const _component_menu_unfold_outlined = MenuUnfoldOutlined;
      const _component_menu_fold_outlined = MenuFoldOutlined;
      const _component_LayoutHeader = __nuxt_component_7;
      const _component_a_layout_content = LayoutContent;
      _push(ssrRenderComponent(_component_a_layout, mergeProps({ style: { height: "100vh" } }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_a_layout_sider, {
              collapsed: collapsed.value,
              "onUpdate:collapsed": ($event) => collapsed.value = $event,
              trigger: null,
              collapsible: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_LayoutSidebar, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_LayoutSidebar)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_a_layout, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_a_layout_header, { style: { "background": "#fb7d7d", "padding": "0" } }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_a_flex, { justify: "space-between" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div${_scopeId4}>`);
                              if (collapsed.value) {
                                _push5(ssrRenderComponent(_component_menu_unfold_outlined, {
                                  class: "trigger",
                                  onClick: () => collapsed.value = !collapsed.value
                                }, null, _parent5, _scopeId4));
                              } else {
                                _push5(ssrRenderComponent(_component_menu_fold_outlined, {
                                  class: "trigger",
                                  onClick: () => collapsed.value = !collapsed.value
                                }, null, _parent5, _scopeId4));
                              }
                              _push5(`</div>`);
                              _push5(ssrRenderComponent(_component_LayoutHeader, null, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode("div", null, [
                                  collapsed.value ? (openBlock(), createBlock(_component_menu_unfold_outlined, {
                                    key: 0,
                                    class: "trigger",
                                    onClick: () => collapsed.value = !collapsed.value
                                  }, null, 8, ["onClick"])) : (openBlock(), createBlock(_component_menu_fold_outlined, {
                                    key: 1,
                                    class: "trigger",
                                    onClick: () => collapsed.value = !collapsed.value
                                  }, null, 8, ["onClick"]))
                                ]),
                                createVNode(_component_LayoutHeader)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_a_flex, { justify: "space-between" }, {
                            default: withCtx(() => [
                              createVNode("div", null, [
                                collapsed.value ? (openBlock(), createBlock(_component_menu_unfold_outlined, {
                                  key: 0,
                                  class: "trigger",
                                  onClick: () => collapsed.value = !collapsed.value
                                }, null, 8, ["onClick"])) : (openBlock(), createBlock(_component_menu_fold_outlined, {
                                  key: 1,
                                  class: "trigger",
                                  onClick: () => collapsed.value = !collapsed.value
                                }, null, 8, ["onClick"]))
                              ]),
                              createVNode(_component_LayoutHeader)
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_a_layout_content, { style: { margin: "24px 16px", padding: "24px", background: "#fdf", minHeight: "280px" } }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` sdsdsdsd `);
                        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push4, _parent4, _scopeId3);
                      } else {
                        return [
                          createTextVNode(" sdsdsdsd "),
                          renderSlot(_ctx.$slots, "default")
                        ];
                      }
                    }),
                    _: 3
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_a_layout_header, { style: { "background": "#fb7d7d", "padding": "0" } }, {
                      default: withCtx(() => [
                        createVNode(_component_a_flex, { justify: "space-between" }, {
                          default: withCtx(() => [
                            createVNode("div", null, [
                              collapsed.value ? (openBlock(), createBlock(_component_menu_unfold_outlined, {
                                key: 0,
                                class: "trigger",
                                onClick: () => collapsed.value = !collapsed.value
                              }, null, 8, ["onClick"])) : (openBlock(), createBlock(_component_menu_fold_outlined, {
                                key: 1,
                                class: "trigger",
                                onClick: () => collapsed.value = !collapsed.value
                              }, null, 8, ["onClick"]))
                            ]),
                            createVNode(_component_LayoutHeader)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_a_layout_content, { style: { margin: "24px 16px", padding: "24px", background: "#fdf", minHeight: "280px" } }, {
                      default: withCtx(() => [
                        createTextVNode(" sdsdsdsd "),
                        renderSlot(_ctx.$slots, "default")
                      ]),
                      _: 3
                    })
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_a_layout_sider, {
                collapsed: collapsed.value,
                "onUpdate:collapsed": ($event) => collapsed.value = $event,
                trigger: null,
                collapsible: ""
              }, {
                default: withCtx(() => [
                  createVNode(_component_LayoutSidebar)
                ]),
                _: 1
              }, 8, ["collapsed", "onUpdate:collapsed"]),
              createVNode(_component_a_layout, null, {
                default: withCtx(() => [
                  createVNode(_component_a_layout_header, { style: { "background": "#fb7d7d", "padding": "0" } }, {
                    default: withCtx(() => [
                      createVNode(_component_a_flex, { justify: "space-between" }, {
                        default: withCtx(() => [
                          createVNode("div", null, [
                            collapsed.value ? (openBlock(), createBlock(_component_menu_unfold_outlined, {
                              key: 0,
                              class: "trigger",
                              onClick: () => collapsed.value = !collapsed.value
                            }, null, 8, ["onClick"])) : (openBlock(), createBlock(_component_menu_fold_outlined, {
                              key: 1,
                              class: "trigger",
                              onClick: () => collapsed.value = !collapsed.value
                            }, null, 8, ["onClick"]))
                          ]),
                          createVNode(_component_LayoutHeader)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_a_layout_content, { style: { margin: "24px 16px", padding: "24px", background: "#fdf", minHeight: "280px" } }, {
                    default: withCtx(() => [
                      createTextVNode(" sdsdsdsd "),
                      renderSlot(_ctx.$slots, "default")
                    ]),
                    _: 3
                  })
                ]),
                _: 3
              })
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props2, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props2, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default-gG7_7Ap4.mjs.map
