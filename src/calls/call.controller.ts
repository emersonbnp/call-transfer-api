import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Res,
  UseInterceptors,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CallService } from "./call.service";
import { Call } from "./document/call";
import { Pagination } from "./dtos/paginationfilter";
import { RegionFilter } from "./dtos/regionfilter";

@ApiTags("calls")
@Controller("/v1/calls")
export class CallController {
  constructor(private readonly callService: CallService) {}

  @Post()
  async addCall(@Res() response: any, @Body() call: Call): Promise<Call> {
    const newCall = await this.callService.add(call);
    return response.status(HttpStatus.CREATED).json({ data: newCall });
  }

  @Get("/filter")
  async getCallsInRegion(
    @Query("location") location: any,
    @Query("page") page: any,
    @Res() response: any,
  ): Promise<Call[]> {
    const filter = new RegionFilter(location)
    const pagination = new Pagination(page)
    const callsInRegion = await this.callService.getCallsInRegion(filter, pagination);
    return response.status(HttpStatus.OK).json({ data: callsInRegion });
  }
}
