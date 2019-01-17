/**

Copyright (c) 2014-2015 National Instruments Corp.

This software is subject to the terms described in the LICENSE.TXT file

SDG
*/

/*! \file
 */

#include "ExecutionContext.h"
#include "VirtualInstrument.h"

namespace Vireo {

VIClumpQueue::VIClumpQueue()
{
    this->_head = nullptr;
    this->_tail = nullptr;
}

//! Add a clump to a Queue. The clump should not be in any other queue.
void VIClumpQueue::Enqueue(VIClump* elt)
{
    // non-nullptr would be a sign it is in another queue/list
    VIREO_ASSERT((nullptr == elt->_next))

    if (this->_head == nullptr) {
        // Its empty, make a one element queue
        this->_head = elt;
        this->_tail = elt;
        elt->_next = nullptr;
    } else {
        // Its not empty, add to tail
        VIREO_ASSERT((nullptr == (this->_tail)->_next))
        VIREO_ASSERT((elt != this->_tail && elt != this->_head))
        this->_tail->_next = elt;
        // not needed elt->_next = nullptr;
        this->_tail = elt;
    }
}

//! Get a clump from a Queue, nullptr returned if none.
VIClump* VIClumpQueue::Dequeue()
{
    VIClump *head = this->_head;

    if (this->_tail != head) {
        VIClump *oldHead = head;
        // If different then something is in the queue
        // dequeue element and fix up list
        this->_head = oldHead->_next;
        oldHead->_next = nullptr;
    } else if (head) {
        // Else if head and tail were equal and non 0
        // then the single element was removed.
        this->_head = nullptr;
        this->_tail = nullptr;
    }
    // else head is nullptr, simply return it.

    return head;
}

}  // namespace Vireo
