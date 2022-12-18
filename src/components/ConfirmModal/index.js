import { Button, Modal, Text } from '@nextui-org/react';

const ConfirmModal = ({ open, onClose }) => {
  return (
    <Modal closeButton open={open} onClose={() => onClose(false)}>
      <Modal.Body>
        <Text b size={20} css={{ color: '$accents8' }}>
          Confirma essa ação?
        </Text>
        <Text size={16}>A mesma não poderá ser desfeita</Text>
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onClick={() => onClose(false)}>
          Não
        </Button>
        <Button auto onClick={() => onClose(true)}>
          Sim
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default ConfirmModal;
