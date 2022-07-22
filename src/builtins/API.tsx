import './API.less';

import { context, IApiComponentProps, useApiData } from 'dumi/theme';
import React, { useContext, useEffect, useRef, useState } from 'react';

import { CodeContext } from '../context';
import { getArray } from '../utils/array';

const LOCALE_TEXTS = {
  'zh-CN': {
    name: '属性名',
    description: '描述',
    type: '类型',
    default: '默认值',
    required: '(必选)',
  },
  'en-US': {
    name: 'Name',
    description: 'Description',
    type: 'Type',
    default: 'Default',
    required: '(required)',
  },
};

const useLocaleName = () => {
  const { locale } = useContext(context);
  return /^zh|cn$/i.test(locale) ? 'zh-CN' : 'en-US';
};

const TuyaAPI = ({ name }) => {
  const localeName = useLocaleName();
  const texts = LOCALE_TEXTS[localeName];
  const [data, setData] = useState(null);

  const { apiData } = useContext(CodeContext);

  const ref = useRef<HTMLTableElement>()

  useEffect(() => {
    if (apiData && apiData[name]) {
      const renderData = apiData[name].map(item => ({
        name: item.name,
        optional: item.optional,
        types: item.types,
        ...item.meta.i18n[localeName],
      }));
      setData(renderData);
    }
  }, [apiData, localeName]);

  return (
    <>
      {data && data.length > 0 && (
        <table ref={ref} className="__dumi-default-api">
          <thead>
            <tr>
              <th className="col-0">{texts.name}</th>
              <th className="col-1">{texts.description}</th>
              <th className="col-2">{texts.type}</th>
              <th className="col-3">{texts.default}</th>
            </tr>
          </thead>
          <tbody>
            {data.map(row => (
              <tr key={row.name}>
                <td className="col-0" dangerouslySetInnerHTML={{
                  __html: row.name
                }} ></td>
                <td className="col-1" dangerouslySetInnerHTML={{
                  __html: row.description || '--'
                }} ></td>
                <td className="col-2">
                  <div dangerouslySetInnerHTML={{ __html: row.types }}></div>
                </td>
                <td className="col-3">
                  <code dangerouslySetInnerHTML={{
                    __html: row.defaultValue ||
                      (!row.optional && texts.required) ||
                      '--'
                  }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

const cleanAPIData = (def: ReturnType<typeof useApiData>['_']) => {
  const { locale } = useContext(context)
  if (def) {
    return def.filter(item => !!item[`description.${locale}`])
  }
  return []
}

const API = ({ identifier, export: expt }: IApiComponentProps) => {
  const data = useApiData(identifier);
  const { locale } = useContext(context);
  const texts = /^zh|cn$/i.test(locale) ? LOCALE_TEXTS['zh-CN'] : LOCALE_TEXTS['en-US'];

  const ref = useRef<HTMLTableElement>()

  // hide table name
  useEffect(() => {
    const previousElementSibling = ref?.current?.previousElementSibling
    if (previousElementSibling) {
      const id = previousElementSibling?.id
      if (/^api-/.test(id)) {
        previousElementSibling.remove()
      }
    }
  }, [])

  return (
    <>
      {data && (
        <table ref={ref} style={{ marginTop: 24 }} className="__dumi-default-api">
          <thead>
            <tr>
              <th className="col-0">{texts.name}</th>
              <th className="col-1">{texts.description}</th>
              <th className="col-2">{texts.type}</th>
              <th className="col-3">{texts.default}</th>
            </tr>
          </thead>
          <tbody>
            {cleanAPIData(getArray(data[expt] ?? data['default'])).map(row => (
              <tr key={row.identifier}>
                <td className="col-0" dangerouslySetInnerHTML={{ __html: row.identifier }}></td>
                <td className="col-1" dangerouslySetInnerHTML={{ __html: row.description || '--' }} ></td>
                <td className="col-2" dangerouslySetInnerHTML={{ __html: row.type }}></td>
                <td className="col-3">
                  <code dangerouslySetInnerHTML={{ __html: row.default || (row.required && texts.required) || '--' }}></code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default ({ name, ...props }) => {
  if (name) {
    return <TuyaAPI name={name} />
  }
  if (props.identifier) {
    return <API {...props as any} />
  }
  return <></>
}
