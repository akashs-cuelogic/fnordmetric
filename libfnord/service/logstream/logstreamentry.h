/**
 * This file is part of the "FnordMetric" project
 *   Copyright (c) 2014 Paul Asmuth, Google Inc.
 *
 * FnordMetric is free software: you can redistribute it and/or modify it under
 * the terms of the GNU General Public License v3.0. You should have received a
 * copy of the GNU General Public License along with this program. If not, see
 * <http://www.gnu.org/licenses/>.
 */
#ifndef _FNORD_LOGSTREAM_SERVICE_LOGSTREAMENTRY_H
#define _FNORD_LOGSTREAM_SERVICE_LOGSTREAMENTRY_H
#include <stdlib.h>
#include <string>

namespace fnord {
namespace logstream_service {

struct LogStreamEntry {
  uint64_t offset;
  std::string data;

  template <typename T>
  static void reflect(T* meta) {
    meta->prop(&LogStreamEntry::offset, 1, "offset", false);
    meta->prop(&LogStreamEntry::data, 2, "data", false);
  }
};

} // namespace logstream_service
} // namespace fnord
#endif
