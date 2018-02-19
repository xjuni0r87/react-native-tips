import WaterfallTips from './WaterfallTips'

describe('WaterfallTips testing', () => {
  let waterfall

  it('should create an empty waterfall tips', () => {
    const emptyWaterfall = new WaterfallTips()

    expect(emptyWaterfall.indexes).toEqual({})
  })

  it('should create index when created', () => {
    waterfall = new WaterfallTips([
      'test', 'button Special', 'ok^'
    ])

    expect(waterfall.indexes).toEqual({
      test: {
        name: 'test',
        position: 0
      },
      buttonSpecial: {
        name: 'buttonSpecial',
        position: 1
      },
      ok: {
        name: 'ok',
        position: 2
      }
    })
  })

  it('should create an index without parameters', () => {
    expect(() => {
      waterfall.createIndex()
    }).toThrow()
  })

  it('should not create an index with the same key', () => {
    expect(() => {
      waterfall.createIndex('test')
    }).toThrow()
  })

  it('should not start the waterfall if we call "next" before "start"', () => {
    waterfall.next()

    expect(waterfall.index).toBeNull()
  })

  it('should start the waterfall tips by selecting the first index', () => {
    waterfall.start()

    expect(waterfall.index).toEqual({
      name: 'test',
      position: 0
    })
  })

  it('should go to the next waterfall tips', () => {
    waterfall.next()

    expect(waterfall.index).toEqual({
      name: 'buttonSpecial',
      position: 1
    })
  })

  it('should return null if we call "next" at the end of the waterfall', () => {
    waterfall.next()
    waterfall.next()
    waterfall.next()

    expect(waterfall.index).toBeNull()
  })

  it('should do nothing if we call "previous" at the beginning of the waterfall', () => {
    waterfall.start()
    waterfall.previous()

    expect(waterfall.index).toEqual({
      name: 'test',
      position: 0
    })
  })

  it('should go the previous waterfall tips', () => {
    waterfall.next()
    waterfall.next()
    expect(waterfall.index.position).toBe(2)

    waterfall.previous()
    expect(waterfall.index).toEqual({
      name: 'buttonSpecial',
      position: 1
    })
  })

  it('should return false if the index is null', () => {
    expect(waterfall.isVisible()).toBeFalsy()
  })

  it('should return true if the index correspond to the index passed to parameter', () => {
    expect(waterfall.isVisible('buttonSpecial')).toBeTruthy()
  })

  it('should return false if the index not corresponding to the index passed to parameter', () => {
    expect(waterfall.isVisible('ok')).toBeFalsy()
  })
})
