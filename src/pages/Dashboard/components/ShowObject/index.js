import { Button, Row, Text } from '@nextui-org/react';
import dynamic from 'next/dynamic';
import { AiOutlineCloudDownload } from 'react-icons/ai';
import { downloadTextFile } from '../../../../utils/json';

const Editor = dynamic(() => import('../../../../components/Editor'), {
  ssr: false,
});

const ShowObject = ({ name, object, margin, exportName }) => {
  return (
    <>
      <Row justify="space-between" align="center">
        <Text b size={20} css={{ tt: 'capitalize', color: '$accents9' }}>
          {name}:
        </Text>
        <Button
          onClick={() => {
            downloadTextFile(
              JSON.stringify(object, null, 1),
              `${exportName || name}.json`
            );
          }}
          icon={<AiOutlineCloudDownload size={25} />}
          color="success"
          css={{
            minWidth: 50,
            margin: '10px 0px !important',
            backgroundColor: '$accents4',
            color: '$accents9',
          }}
        />
      </Row>
      <Editor
        value={JSON.stringify(object, null, 1)}
        readOnly
        onChange={() => {}}
      />
    </>
  );
};
export default ShowObject;
