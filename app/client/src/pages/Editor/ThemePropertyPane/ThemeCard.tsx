import { tw, css } from "twind/css";
import * as Sentry from "@sentry/react";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getAppThemingStack,
  AppThemingMode,
} from "selectors/appThemingSelectors";
import {
  changeSelectedThemeAction,
  setAppThemingModeStack,
} from "actions/appThemingActions";
import { last } from "lodash";
import Button from "components/ads/Button";
import { AppTheme } from "entities/AppTheming";
import CheckmarkIcon from "remixicon-react/CheckLineIcon";
import { getCustomTextColor2 } from "widgets/WidgetUtils";
import { getCurrentApplicationId } from "selectors/editorSelectors";

interface ThemeCard {
  theme: AppTheme;
  isSelected?: boolean;
  className?: string;
  selectable?: boolean;
  editable?: boolean;
}

export function ThemeCard(props: ThemeCard) {
  const { editable, selectable, theme } = props;
  const dispatch = useDispatch();
  const themingStack = useSelector(getAppThemingStack);
  const applicationId = useSelector(getCurrentApplicationId);
  const themingMode = last(themingStack);
  const isThemeSelectionMode =
    themingMode === AppThemingMode.APP_THEME_SELECTION;

  /**
   * sets the mode to THEME_EDIT
   */
  const onClickChangeThemeButton = useCallback(() => {
    dispatch(
      setAppThemingModeStack([
        ...themingStack,
        AppThemingMode.APP_THEME_SELECTION,
      ]),
    );
  }, [setAppThemingModeStack]);

  /**
   * sets the mode to THEME_SELECTION
   */
  const onClickEditThemeButton = useCallback(() => {
    dispatch(
      setAppThemingModeStack([...themingStack, AppThemingMode.APP_THEME_EDIT]),
    );
  }, [changeSelectedThemeAction]);

  // colors
  const userDefinedColors = theme.properties.colors;
  const primaryColor = userDefinedColors.primaryColor;
  const backgroundColor = userDefinedColors.backgroundColor;

  // border radius
  const borderRadius = theme.properties.borderRadius;
  const primaryBorderRadius = borderRadius[Object.keys(borderRadius)[0]];

  // box shadow
  const boxShadow = theme.properties.boxShadow;
  const primaryBoxShadow = boxShadow[Object.keys(boxShadow)[0]];

  /**
   * fires action for changing theme
   *
   * NOTE: since we are same card in theme edit and theme selection,
   * we don't need to fire the action in theme edit mode on click on the card
   */
  const changeSelectedTheme = useCallback(() => {
    if (isThemeSelectionMode) {
      dispatch(changeSelectedThemeAction({ applicationId, theme }));
    }
  }, [changeSelectedThemeAction]);

  return (
    <div
      className={`ring-1 p-0.5 ${
        props.isSelected ? "ring-primary-500 ring-2" : "ring-gray-200"
      } ${props.className} ${
        !selectable ? "overflow-hidden" : ""
      }  relative group hover:shadow-xl transition-all cursor-pointer`}
      onClick={changeSelectedTheme}
    >
      <main
        className={`${tw`bg-[${backgroundColor}]`} ${
          !selectable ? "group-hover:blur-md filter" : ""
        }`}
      >
        <hgroup
          className={`${tw`bg-[${primaryColor}] text-[${getCustomTextColor2(
            primaryColor,
          )}]`} text-white flex p-3`}
        >
          <h3 className="flex-grow">{theme.name}</h3>
          <aside>@appsmith</aside>
        </hgroup>
        <section className="flex justify-between px-3 pt-3">
          <div
            className={`${tw`text-[${getCustomTextColor2(backgroundColor)}]`}`}
          >
            AaBbCc
          </div>
          <div className="flex items-center space-x-2">
            {Object.keys(userDefinedColors).map((colorKey, index) => (
              <div
                className={`${tw`bg-[${userDefinedColors[colorKey] ||
                  userDefinedColors[colorKey]}]`} border rounded-full h-6 w-6`}
                key={index}
              />
            ))}
          </div>
        </section>
        <section className="p-3">
          <div className="flex space-x-2">
            <button
              className={`${tw`rounded-[${primaryBorderRadius}] bg-[${primaryColor}] text-[${getCustomTextColor2(
                primaryColor,
              )}] px-4 py-1 ${tw`${css({
                "&": {
                  boxShadow: primaryBoxShadow,
                },
              })}`}`}`}
            >
              Button
            </button>
            <button
              className={`${tw`rounded-[${primaryBorderRadius}] border border-[${primaryColor}] bg-white text-[${primaryColor}] ${tw`${css(
                {
                  "&": {
                    boxShadow: primaryBoxShadow,
                  },
                },
              )}`}`} px-4 py-1`}
            >
              Button
            </button>
          </div>
        </section>
      </main>
      <aside
        className={`absolute top-0 bottom-0 left-0 right-0 items-center justify-center hidden bg-black bg-opacity-25 ${
          !selectable ? "group-hover:flex" : ""
        }`}
      >
        <div className="space-y-2">
          <Button onClick={onClickChangeThemeButton} text="Change Theme" />
          {editable && (
            <Button onClick={onClickEditThemeButton} text="Edit Theme" />
          )}
        </div>
      </aside>
      {props.isSelected && (
        <CheckmarkIcon className="absolute w-6 h-6 text-white border-2 border-white rounded-full -right-2 -top-2 bg-primary-500" />
      )}
    </div>
  );
}

ThemeCard.displayName = "ThemeCard";

export default Sentry.withProfiler(ThemeCard);
