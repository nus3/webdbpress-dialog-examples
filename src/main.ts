import './style.css'

const isDialogElement = (target: unknown): target is HTMLDialogElement => {
  return target instanceof HTMLDialogElement
}

const waitDialogAnimation = (dialog: HTMLDialogElement) =>
  Promise.allSettled(
    dialog.getAnimations().map((animation) => animation.finished),
  )

const handleShowDialog = async (dialog: HTMLDialogElement) => {
  await waitDialogAnimation(dialog)
  dialog.removeAttribute('style')
  dialog.showModal()
  document.documentElement.style.overflow = 'hidden'
}

const handleCloseDialog = async (event: Event, dialog: HTMLDialogElement) => {
  if (isDialogElement(event.target)) {
    await waitDialogAnimation(event.target)
    dialog.style.display = 'none'
    document.documentElement.removeAttribute('style')
  }
}

const modalDialog = () => {
  const openButton = document.getElementById('openButton')
  const closeButton = document.getElementById('closeButton')
  const modalDialog = document.getElementById('modalDialog')

  if (!isDialogElement(modalDialog)) return

  openButton?.addEventListener('click', () => {
    handleShowDialog(modalDialog)
  })

  closeButton?.addEventListener('click', () => {
    modalDialog.close('nus3')
  })

  modalDialog.addEventListener('close', (e) => {
    console.info(modalDialog.returnValue)
    handleCloseDialog(e, modalDialog)
  })
}

const main = () => {
  modalDialog()
}

main()
