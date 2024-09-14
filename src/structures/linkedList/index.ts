export class NodeLK {
	value: number
	next: NodeLK | null
	previous: NodeLK | null

	constructor(value: number) {
		this.value = value
		this.next = null
		this.previous = null
	}
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class LinkedList {
	head: NodeLK | null
	tail: NodeLK | null

	constructor() {
		this.head = null
		this.tail = null
	}

	insertHead(newHead: NodeLK): void {
		if (this.head === null) {
			this.head = newHead
			this.tail = newHead
		} else {
			this.head.previous = newHead
			newHead.next = this.head
			this.head = newHead
		}
	}

	insertTail(newTail: NodeLK): void {
		if (this.tail === null) {
			this.head = newTail
			this.tail = newTail
		} else {
			newTail.previous = this.tail
			this.tail.next = newTail
			this.tail = newTail
		}
	}

	insertAfterNode(newNode: NodeLK, positionToInsert: NodeLK): void {
		const nodeSearched = this.searchNode(positionToInsert)
		if (nodeSearched) {
			if (nodeSearched.next) {
				newNode.next = nodeSearched.next
				nodeSearched.next.previous = newNode
			}
			if (nodeSearched === this.tail) {
				this.tail = newNode
			}
		} else {
			throw new Error('Node not found in the list')
		}
	}

	removeNode(nodeToRemove: NodeLK): void {
		const nodeSearched = this.searchNode(nodeToRemove)
		if (nodeSearched) {
			if (nodeSearched === this.head) {
				const nextToHead = this.head.next
				if (nextToHead) {
					nextToHead.previous = null
					this.head = nextToHead
				} else {
					// if only one node
					this.head = null
					this.tail = null
				}
			} else if (nodeSearched === this.tail) {
				const previousToTail = this.tail.previous
				if (previousToTail) {
					previousToTail.next = null
					this.tail = previousToTail
				} else {
					// if only one node
					this.head = null
					this.tail = null
				}
			} else {
				const previousToTail = nodeSearched.previous
				const nextToHead = nodeSearched.next
				if (previousToTail && nextToHead) {
					previousToTail.next = nextToHead
					nextToHead.previous = previousToTail
				}
			}
		} else {
			throw new Error('Node not found in the list')
		}
	}

	printAllValues(): void {
		if (!this.head) {
			throw new Error('Node not found in the list')
		}

		let currentNode = this.head
		while (currentNode) {
			console.log(currentNode.value)
			if (currentNode.next) currentNode = currentNode.next
		}
	}

	length(): number {
		let currentNode = this.head
		let count = 0
		while (currentNode) {
			count++
			currentNode = currentNode.next
		}
		return count
	}

	searchNode(nodeToFind: NodeLK): NodeLK | undefined {
		let currentNode = this.head
		while (currentNode) {
			if (currentNode === nodeToFind) {
				return currentNode
			}
			currentNode = currentNode.next
		}
		return undefined
	}

	clearList(): void {
		this.head = null
		this.tail = null
	}
}
